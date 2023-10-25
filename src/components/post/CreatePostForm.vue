<template>
    <div class="flex flex-row align-middle items-center px-4">
        <n-form class="w-full" ref="formRef" :model="model" :rules="rules" label-placement="left"
            require-mark-placement="right-hanging" size="medium" label-width="auto">

            <!-- Title -->
            <n-form-item label="Title" path="postTitle">
                <n-input v-model:value="model.postTitle" placeholder="Post title" />
            </n-form-item>

            <!-- Content -->
            <n-form-item label="Content" path="postContentValue">
                <n-input v-model:value="model.postContentValue" placeholder="Post content" type="textarea" :autosize="{
                    minRows: 3,
                    maxRows: 5
                }" />
            </n-form-item>

            <!-- Upload Images -->
            <n-form-item label="Upload" path="uploadValue">
                <n-upload :max="4" :show-cancel-button="false" :show-remove-button="false" action=""
                    :default-file-list="previewFileList" list-type="image-card" @preview="handlePreview"
                    :custom-request="customRequest" />
                <n-modal v-model:show="showModal" preset="card" style="width: 600px" title="Upload Image">
                    <img :src="previewImageUrl" style="width: 100%">
                </n-modal>
            </n-form-item>

            <!-- Spoiler -->
            <n-form-item>
                <span class="mr-8">Spoiler</span>
                <n-switch v-model:value="spoiler" :rail-style="railStyle" />
            </n-form-item>

            <!-- Tags -->
            <n-form-item label="Tags">
                <n-select v-model:value="tags" filterable multiple tag placeholder="Tags, press enter to add"
                    :show-arrow="false" :show="false" />
            </n-form-item>

            <!-- Submit -->
            <div style="display: flex; justify-content: flex-end">
                <TopicoButtonVue @click="handleSubmit">Submit</TopicoButtonVue>
            </div>
        </n-form>
    </div>
</template>
 
<script lang="ts">

import TopicoButtonVue from '@/components/common/TopicoButton.vue';
import { createPost } from '@/services/communityService';
import useGlobalStore from '@/stores/global';
import axios from 'axios';
import { FormInst, NButton, NForm, NFormItem, NInput, NSwitch, NUpload, NModal, NSelect, UploadCustomRequestOptions, UploadFileInfo, useMessage } from 'naive-ui';
import { CSSProperties, defineComponent, ref } from 'vue';

export default defineComponent({
    components: {
        NForm,
        NFormItem, NInput, TopicoButtonVue,
        NSwitch, NButton, NUpload, NSelect, NModal
    },
    props: {
        communityId: {
            type: Number,
            required: true
        }
    },
    setup() {
        const formRef = ref<FormInst | null>(null);
        const message = useMessage();
        const globalStore = useGlobalStore();
        const showModalRef = ref(false);
        const previewImageUrlRef = ref('')
        function handlePreview(file: UploadFileInfo) {
            const { url } = file
            previewImageUrlRef.value = url as string
            showModalRef.value = true
        }
        return {
            globalStore, message,
            formRef, previewImageUrl: previewImageUrlRef,
            spoiler: ref(false),
            model: ref({
                postTitle: '',
                postContentValue: '',
            }),
            showModal: showModalRef,
            handlePreview,
            tags: ref([]),
            rules: {
                postTitle: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: 'Please input post title'
                },
                postContentValue: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: 'Please input post content'
                },
            },
            railStyle: ({
                focused,
                checked
            }: {
                focused: boolean
                checked: boolean
            }) => {
                const style: CSSProperties = {}
                if (checked) {
                    style.background = 'var(--primary-color)'
                    if (focused) {
                        style.boxShadow = '0 0 0 2px #d0305040'
                    }
                } else {
                    style.background = '#ddd'
                    if (focused) {
                        style.boxShadow = '0 0 0 2px #2080f040'
                    }
                }
                return style
            },
            fileList: ref<UploadFileInfo[]>([

            ]),
            previewFileList: ref<UploadFileInfo[]>([

            ])
        }
    },
    data() {
        return {
            imageIds: new Set<number>()
        }
    },
    methods: {
        async customRequest({
            file, data,
        }: UploadCustomRequestOptions) {
            const formData = new FormData()
            if (data) {
                Object.keys(data).forEach((key) => {
                    formData.append(
                        key,
                        data[key as keyof UploadCustomRequestOptions['data']]
                    )
                })
            }
            formData.append('image', file.file as File);
            const res = await axios.post('/api/v1/images', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            const id = res?.data?.data?.id;
            if (isNaN(id)) return;
            this.imageIds.add(id);
        },
        handleSubmit(e: MouseEvent) {
            e.preventDefault();
            this.formRef?.validate(async (errors) => {
                if (!errors) {
                    // Upload
                    const post: CreatePostDto = {
                        communityId: this.communityId,
                        title: this.model.postTitle,
                        content: this.model.postContentValue,
                        images: Array.from(this.imageIds),
                        tags: JSON.stringify(this.tags),
                        spoiler: this.spoiler
                    };
                    const res = await createPost(post);
                    if (res.code !== 200) {
                        this.message.error('Failed to upload post: ' + res.message ?? 'Unknown error');
                        return;
                    }
                    this.message.success('Success!');
                    this.$router.go(0);
                } else {
                    console.log(errors)
                    this.message.error('Invalid post data')
                }
            });
        },
    }
})

</script>

<style lang="scss" scoped></style>