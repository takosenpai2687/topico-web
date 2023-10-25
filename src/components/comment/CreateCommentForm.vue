<template>
    <div class="flex flex-row align-middle items-center px-4">
        <n-form class="w-full" ref="formRef" :model="model" :rules="rules" label-placement="left"
            require-mark-placement="right-hanging" size="medium" label-width="auto">

            <!-- Content -->
            <n-form-item label="Content" path="commentContentValue">
                <n-input v-model:value="model.commentContentValue" placeholder="Comment content" type="textarea" :autosize="{
                    minRows: 3,
                    maxRows: 5
                }" />
            </n-form-item>

            <!-- Upload Images -->
            <n-form-item label="Upload" path="uploadValue">
                <n-upload :max="1" :show-cancel-button="false" :show-remove-button="false" action=""
                    :default-file-list="previewFileList" list-type="image-card" @preview="handlePreview"
                    :custom-request="customRequest" />
                <n-modal v-model:show="showModal" preset="card" style="width: 600px" title="Upload Image">
                    <img :src="previewImageUrl" style="width: 100%">
                </n-modal>
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
import { createComment } from '@/services/postService';
import useGlobalStore from '@/stores/global';
import axios from 'axios';
import { FormInst, NButton, NForm, NFormItem, NInput, NModal, NSelect, NSwitch, NUpload, UploadCustomRequestOptions, UploadFileInfo, useMessage } from 'naive-ui';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: {
        NForm,
        NFormItem, NInput, TopicoButtonVue,
        NSwitch, NButton, NUpload, NSelect, NModal
    },
    props: {
        postId: {
            type: Number,
            required: true
        },
        replyToUserId: {
            type: Number,
            required: false
        },
        parentId: {
            type: Number,
            required: false
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
                commentContentValue: '',
            }),
            showModal: showModalRef,
            handlePreview,
            tags: ref([]),
            rules: {
                commentContentValue: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: 'Please input comment content'
                },
            },
            fileList: ref<UploadFileInfo[]>([

            ]),
            previewFileList: ref<UploadFileInfo[]>([

            ])
        }
    },
    data() {
        return {
            imageId: null as number | null,
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
            this.imageId = id;
        },
        handleSubmit(e: MouseEvent) {
            e.preventDefault();
            this.formRef?.validate(async (errors) => {
                if (!errors) {
                    // Upload
                    const comment: CreateCommentDto = {
                        postId: this.postId,
                        content: this.model.commentContentValue,
                        parentId: this.parentId,
                        replyToUserId: this.replyToUserId,
                        imageId: this.imageId,
                    };
                    const res = await createComment(comment);
                    if (res.code !== 200) {
                        this.message.error('Failed to upload comment: ' + res.message ?? 'Unknown error');
                        return;
                    }
                    this.message.success('Success!');
                    this.$router.go(0);
                } else {
                    console.log(errors)
                    this.message.error('Invalid comment data')
                }
            });
        },
    }
})

</script>

<style lang="scss" scoped></style>