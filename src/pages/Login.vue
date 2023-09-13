<template>
    <div class="relative w-full h-full flex justify-center items-center">
        <wave v-if="globalStore.showWaves" class="wave z-0" />
        <div class="container relative p-4 bg-white z-10 ">
            <div class="logo px-8 pb-4">
                <font-awesome-icon class="logo-icon" icon="fa-brands fa-cloudversify" />
                <h1 class="logo-text">Topico</h1>
            </div>
            <div class="flex flex-row items-center justify-between">
                <!-- Left side login form -->
                <div class="login flex flex-col h-full justify-center items-center">
                    <div class="flex flex-col w-4/5 justify-between gap-4">
                        <n-form>
                            <n-form-item label="Email" :validation-status="inputValidationStatus" :feedback="inputFeedback">
                                <n-input :disabled="isSignup" v-model:value="email" clearable />
                            </n-form-item>
                            <n-input :disabled="isSignup" v-model:value="password" type="password" placeholder="Password"
                                class="input" />
                            <div class="flex flex-row justify-evenly items-center py-4 gap-2">
                                <TopicoButton class="w-1/2" :disabled="isSignup">Login</TopicoButton>
                                <TopicoButton class="w-1/2" color="#333" @click="handleClickSignup">Signup</TopicoButton>
                            </div>
                        </n-form>
                    </div>
                </div>
                <!-- Right side signup form -->
                <div class="signup flex flex-col h-full justify-center items-center" :class="isSignup ? 'expanded' : ''">
                    <div class="flex flex-col w-4/5 justify-between gap-4">
                        <n-input :disabled="!isSignup" v-model:value="newEmail" type="text" placeholder="Email"
                            class="input" />
                        <n-input :disabled="!isSignup" v-model:value="newNickName" type="text" placeholder="Nickname"
                            class="input" />
                        <n-input :disabled="!isSignup" v-model:value="newPassword" type="password" placeholder="Password"
                            class="input" />
                        <n-input :disabled="!isSignup" v-model:value="confirmPassword" type="password"
                            placeholder="Confirm Password" />
                        <div class="flex flex-row justify-evenly items-center py-4">
                            <TopicoButton class="w-full" color="#333" @click="handleClickSignup">Join for free
                            </TopicoButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import useGlobalStore from '@/stores/global';
import { defineComponent } from 'vue'
import Wave from '@/components/common/Wave.vue';
import { NInput, NFormItem, NForm } from 'naive-ui';
import TopicoButton from '@/components/common/TopicoButton.vue';

export default defineComponent({
    name: 'Login',
    components: {
        Wave, NInput, TopicoButton, NFormItem
    },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    mounted() {
        this.globalStore.setShowWaves(true);
        this.globalStore.setWaterLevel(window.innerHeight / 2);
    },
    data() {
        return {
            email: '',
            password: '',
            isSignup: false,
            newEmail: '',
            newNickName: '',
            newPassword: '',
            confirmPassword: ''
        }
    },
    methods: {
        handleClickSignup() {
            if (this.isSignup) {
                this.isSignup = false;
                this.newEmail = '';
                this.newNickName = '';
                this.newPassword = '';
                this.confirmPassword = '';
            } else {
                this.isSignup = true;
                this.email = '';
                this.password = '';
            }
        }
    }
})
</script>

<style lang="scss" scoped>
$form-width: 20em;
$form-height: 22em;

.container {
    border-radius: 1em;
    width: auto;
    box-shadow: 0 0 16px 1px rgba(0, 0, 0, 0.1);

    .logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        user-select: none;
        color: var(--primary-color);

        .logo-icon {
            font-size: 3.2em;
            color: inherit;
        }

        .logo-text {
            font-family: righteous;
            font-size: 2.6em;
            color: inherit;
            margin-top: -.2em;
            font-weight: bold;
            letter-spacing: .05em;
        }
    }

    .login {
        width: $form-width;
        height: auto;
        max-height: $form-height;
    }

    .signup {
        width: 0;
        height: 0;
        transform: scaleX(0);
        transition: transform 0.2s ease-out;

        &.expanded {
            width: $form-width;
            height: $form-height;
            transform: scaleX(1);
            border-left: 2px solid #f0f0f0 !important;
        }
    }
}
</style>