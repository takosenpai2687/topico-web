<template>
    <TopicoTitleCard title="# Edit Password" class="profile-card absolute top-1/2 left-1/2">
        <div class="flex flex-row align-middle items-center p-4">
            <n-form class="w-full" ref="formRef" :model="model" :rules="rules" label-placement="left"
                require-mark-placement="right-hanging" size="medium" label-width="auto">

                <!-- Nickname -->
                <n-form-item label="Old Password" path="oldPassword">
                    <n-input v-model:value="model.oldPassword" type="password" placeholder="Enter old password" />
                </n-form-item>

                <!-- Description -->
                <n-form-item label="New Password" path="newPassword">
                    <n-input v-model:value="model.newPassword" type="password" placeholder="Enter new password" />
                </n-form-item>

                <!-- Submit -->
                <div class="flex flex-row justify-end items-center">
                    <TopicoButton @click="handleSubmit">Submit</TopicoButton>
                </div>
            </n-form>
        </div>
    </TopicoTitleCard>
</template>

<script lang="ts">
import TopicoButton from "@/components/common/TopicoButton.vue";
import TopicoTitleCard from "@/components/common/TopicoTitleCard.vue";
import { updatePassword } from "@/services/userService";
import useGlobalStore from "@/stores/global";
import { FormInst, NForm, NFormItem, NInput, NSelect, NUpload, useMessage } from "naive-ui";
import { ref } from "vue";

export default {
    name: 'EditPassword',
    components: { TopicoButton, NForm, NInput, NFormItem, TopicoTitleCard, NSelect, NUpload },
    setup() {
        const formRef = ref<FormInst | null>(null);
        const message = useMessage();
        const globalStore = useGlobalStore();
        return {
            globalStore, message,
            formRef,
            model: ref({
                oldPassword: '',
                newPassword: '',
            }),
            rules: {
                oldPassword: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: 'Old password should not be empty'
                },
                newPassword: {
                    required: true,
                    trigger: ['blur', 'input'],
                    message: 'New password should not be empty'
                },
            },
        }
    },
    created() {
        document.title = "Topico - Edit Profile";
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
                    oldPassword: this.model.oldPassword,
                    newPassword: this.model.newPassword,
                };
                try {
                    await updatePassword(updateUserDto);
                    this.message.success('Password updated');
                } catch (e: any) {
                    this.message.error('Failed to update password: ' + e.message);
                }
            });
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


