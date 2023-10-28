<template>
    <div class="wrapper absolute top-1/2 left-1/2">
        <!-- Create Community Card -->
        <TopicoTitleCard title="# Create Community" class="create-card">
            <div class="flex flex-row align-middle items-center pt-2">
                <n-form class="w-full" ref="formRef" :model="model" :rules="rules" label-placement="left"
                    require-mark-placement="right-hanging" size="medium" label-width="auto">

                    <!-- Community Name -->
                    <n-form-item label="Community Name" path="name">
                        <n-input v-model:value="model.name" placeholder="Community Name" />
                    </n-form-item>

                    <!-- Description -->
                    <n-form-item label="Description" path="description">
                        <n-input v-model:value="model.description" placeholder="Description" />
                    </n-form-item>

                    <!-- Upload Avatar -->
                    <n-form-item label="Avatar" path="uploadValueAvatar">
                        <n-upload :max="1" :show-cancel-button="false" :show-remove-button="false" action=""
                            :default-file-list="previewAvatarFileList" list-type="image-card" @preview="handlePreview"
                            :custom-request="customRequestAvatar" />
                        <n-modal v-model:show="showAvatarModal" preset="card" style="width: 600px" title="Upload Image">
                            <img :src="previewImageUrl" style="width: 100%">
                        </n-modal>
                    </n-form-item>

                    <!-- Upload Banner -->
                    <n-form-item label="Banner" path="uploadValueBanner">
                        <n-upload :max="1" :show-cancel-button="false" :show-remove-button="false" action=""
                            :default-file-list="previewBannerFileList" list-type="image-card" @preview="handlePreview"
                            :custom-request="customRequestBanner" />
                        <n-modal v-model:show="showBannerModal" preset="card" style="width: 600px" title="Upload Image">
                            <img :src="previewImageUrl" style="width: 100%">
                        </n-modal>
                    </n-form-item>

                    <!-- Submit -->
                    <div class="flex flex-row justify-end items-center">
                        <TopicoButton @click="handleSubmit">Submit</TopicoButton>
                    </div>
                </n-form>
            </div>
        </TopicoTitleCard>
        <!-- Communities Data Table -->

    </div>
</template>

<script lang="ts">
import useGlobalStore from "@/stores/global";
import { NForm, NInput, NFormItem, FormInst, UploadFileInfo, useMessage, UploadCustomRequestOptions, NSelect, NUpload, NModal } from "naive-ui";
import TopicoButton from "@/components/common/TopicoButton.vue";
import { ref } from "vue";
import axios from "axios";
import TopicoTitleCard from "@/components/common/TopicoTitleCard.vue";
import { createCommunity, getAllCommunities } from "@/services/communityService";

export default {
    name: 'Profile',
    components: { TopicoButton, NForm, NInput, NFormItem, TopicoTitleCard, NSelect, NUpload, NModal },
    setup() {
        const formRef = ref<FormInst | null>(null);
        const message = useMessage();
        const globalStore = useGlobalStore();
        const showAvatarModalRef = ref(false);
        const showBannerModalRef = ref(false);
        const previewImageUrlRef = ref('')
        function handlePreview(file: UploadFileInfo) {
            const { url } = file
            previewImageUrlRef.value = url as string
            showAvatarModalRef.value = true
        }
        return {
            globalStore, message,
            formRef, previewImageUrl: previewImageUrlRef,
            spoiler: ref(false),
            model: ref({
                name: '',
                description: '',
            }),
            showAvatarModal: showAvatarModalRef,
            showBannerModal: showBannerModalRef,
            handlePreview,
            rules: {
                nickName: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: 'Nickname should not be empty'
                },
                gender: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: 'Please select gender'
                },
            },
            fileList: ref<UploadFileInfo[]>([

            ]),
            previewAvatarFileList: ref<UploadFileInfo[]>([

            ]),
            previewBannerFileList: ref<UploadFileInfo[]>([

            ]),
        }
    },
    data() {
        return {
            imageIds: new Set<number>(),
            avatarId: 0,
            bannerId: 0,
            comms: [] as Community[],
        }
    },
    created() {
        document.title = "Admin - Create Community";
        if (this.globalStore.user.role !== 'ROLE_ADMIN') {
            this.message.error('You are not an admin');
            this.$router.push('/');
        }
        this.globalStore.setShowWaves(true);
        this.globalStore.setWaterLevel(496.5);
        this.fetchComms();
    },
    methods: {
        async fetchComms() {
            this.comms = [];
            this.comms = await getAllCommunities();
        },
        handleSubmit() {
            this.formRef?.validate(async (error) => {
                if (error) {
                    this.message.error('Invalid inputs');
                    return;
                }
                const createCommunityDto: any = {
                    name: this.model.name,
                    description: this.model.description,
                    avatar: this.avatarId,
                    banner: this.bannerId,
                };
                try {
                    const res = await createCommunity(createCommunityDto);
                    if (res.code !== 200) throw new Error(res.message ?? 'Unknown error');
                    this.message.success('Community created');

                } catch (e: any) {
                    this.message.error('Failed to create community: ' + e.message);
                } finally {
                    this.$router.go(0);
                }
            });
        },
        async customRequestAvatar({
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
            this.avatarId = id;
        },
        async customRequestBanner({
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
            this.bannerId = id;
        },
    }
};
</script>

<style lang="scss" scoped>
.wrapper {
    transform: translate(-50%, -50%);

    .create-card {
        width: 600px;

        .link {
            color: #fff !important;
        }
    }
}
</style>
