<template>
    <TopicoTitleCard title="# Edit Profile" class="profile-card absolute top-1/2 left-1/2">
        <div class="flex flex-row align-middle items-center p-4">
            <n-form class="w-full" ref="formRef" :model="model" :rules="rules" label-placement="left"
                require-mark-placement="right-hanging" size="medium" label-width="auto">

                <!-- Nickname -->
                <n-form-item label="Nickname" path="nickName">
                    <n-input v-model:value="model.nickName" placeholder="Nickname" />
                </n-form-item>

                <!-- Gender -->
                <n-form-item label="Gender" path="gender">
                    <n-select v-model:value="model.gender" :options="genderOptions" />
                </n-form-item>

                <!-- Description -->
                <n-form-item label="Description" path="description">
                    <n-input v-model:value="model.description" placeholder="Description" />
                </n-form-item>


                <!-- Upload Images -->
                <n-form-item label="Avatar" path="uploadValue">
                    <n-upload :max="1" :show-cancel-button="false" :show-remove-button="false" action=""
                        :default-file-list="previewFileList" list-type="image-card" @preview="handlePreview"
                        :custom-request="customRequest" />
                    <n-modal v-model:show="showModal" preset="card" style="width: 600px" title="Upload Image">
                        <img :src="previewImageUrl" style="width: 100%">
                    </n-modal>
                </n-form-item>

                <!-- Submit -->
                <div class="flex flex-row justify-between items-center">
                    <TopicoButton color="#444">
                        <RouterLink class="link" to="/edit_password">Change Password</RouterLink>
                    </TopicoButton>
                    <TopicoButton @click="handleSubmit">Submit</TopicoButton>
                </div>
            </n-form>
        </div>
    </TopicoTitleCard>
</template>

<script lang="ts">
import useGlobalStore from "@/stores/global";
import { NForm, NInput, NFormItem, FormInst, UploadFileInfo, useMessage, UploadCustomRequestOptions, NSelect, NUpload, NModal } from "naive-ui";
import TopicoButton from "@/components/common/TopicoButton.vue";
import { ref } from "vue";
import axios from "axios";
import { updateUser } from "@/services/userService";
import TopicoTitleCard from "@/components/common/TopicoTitleCard.vue";

export default {
    name: 'Profile',
    components: { TopicoButton, NForm, NInput, NFormItem, TopicoTitleCard, NSelect, NUpload, NModal },
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
                nickName: globalStore.user?.nickName,
                gender: globalStore.user?.gender,
                description: globalStore.user?.description,
            }),
            showModal: showModalRef,
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
            previewFileList: ref<UploadFileInfo[]>([

            ]),
            genderOptions: [{
                label: 'Male',
                value: 'MALE'
            },
            {
                label: 'Female',
                value: 'FEMALE'
            },
            {
                label: 'Not Applicable',
                value: 'NOT_APPLICABLE'
            },
            {
                label: 'Not known',
                value: 'NOT_KNOWN'
            }
            ]
        }
    },
    data() {
        return {
            imageIds: new Set<number>(),
            avatarId: 0,
        }
    },
    created() {
        document.title = "Topico - Profile";
        this.globalStore.setShowWaves(true);
        this.globalStore.setWaterLevel(496.5);
    },
    methods: {
        handleSubmit() {
            this.formRef?.validate(async (error) => {
                if (error) {
                    this.message.error('Invalid inputs');
                    return;
                }
                const updateUserDto: any = {
                    nickName: this.model.nickName,
                    gender: this.model.gender,
                    avatar: this.avatarId,
                    description: this.model.description
                };
                try {
                    const newUser = await updateUser(updateUserDto);
                    this.globalStore.setUser(newUser);
                    this.message.success('User updated');
                } catch (e: any) {
                    this.message.error('Failed to update user: ' + e.message);
                }
            });
        },
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
            this.avatarId = id;
        },
    }
};
</script>

<style lang="scss" scoped>
.profile-card {
    transform: translate(-50%, -50%);
    width: 600px;
}

.link {
    color: #fff !important;
}
</style>
