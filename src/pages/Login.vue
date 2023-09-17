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
                        <n-form ref="loginFormRef" :model="loginFormValue" :rules="loginRules">
                            <!-- Email -->
                            <n-form-item label="Email" path="email">
                                <n-input :disabled="isSignup" v-model:value="loginFormValue.email" clearable
                                    placeholder="Email" />
                            </n-form-item>
                            <!-- Password -->
                            <n-form-item label="Password" path="password">
                                <n-input :disabled="isSignup" v-model:value="loginFormValue.password" type="password"
                                    placeholder="Password" class="input" />
                            </n-form-item>
                            <!-- Buttons -->
                            <div class="flex flex-row justify-evenly items-center py-4 gap-2">
                                <TopicoButton class="w-1/2" :disabled="isSignup" @click="handleLogin">Login</TopicoButton>
                                <TopicoButton class="w-1/2" color="#333" @click="handleClickSignup">Signup</TopicoButton>
                            </div>
                        </n-form>
                    </div>
                </div>
                <!-- Right side signup form -->
                <div class="signup flex flex-col h-full justify-center items-center" :class="isSignup ? 'expanded' : ''">
                    <div class="flex flex-col w-4/5 justify-between gap-4">
                        <n-form ref="signupFormRef" :model="signupFormValue" :rules="signupRules">
                            <!-- Email -->
                            <n-form-item label="Email" path="email">
                                <n-input :disabled="!isSignup" v-model:value="signupFormValue.email" clearable
                                    placeholder="Email" />
                            </n-form-item>
                            <!-- Nickname -->
                            <n-form-item label="Nickname" path="nickName">
                                <n-input :disabled="!isSignup" v-model:value="signupFormValue.nickName" clearable
                                    placeholder="Nickname" />
                            </n-form-item>
                            <!-- Password -->
                            <n-form-item label="Password" path="password">
                                <n-input :disabled="!isSignup" v-model:value="signupFormValue.password" type="password"
                                    placeholder="Password" class="input" />
                            </n-form-item>
                            <!-- Confirm Password -->
                            <n-form-item label="Password" path="confirmPassword" :validation-status="confirmPwdStatus"
                                :feedback="confirmPwdFeedback">
                                <n-input :disabled="!isSignup" v-model:value="signupFormValue.confirmPassword"
                                    type="password" placeholder="Confirm Password" class="input" />
                            </n-form-item>
                            <div class="flex flex-row justify-evenly items-center py-4">
                                <TopicoButton class="w-full" color="#333" @click="handleSignup">Join for free
                                </TopicoButton>
                            </div>
                        </n-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import useGlobalStore from '@/stores/global';
import { computed, defineComponent, ref } from 'vue'
import Wave from '@/components/common/Wave.vue';
import { NInput, NFormItem, NForm, FormInst, useMessage, FormItemRule } from 'naive-ui';
import TopicoButton from '@/components/common/TopicoButton.vue';
import { login, signup } from '@/services/authService';

const emailValidator = (_rule: FormItemRule, value: string) => {
    if (value.trim().length === 0) {
        return new Error('Email is required');
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i.test(value)) {
        return new Error('Email is invalid');
    }
    return true;
}

export default defineComponent({
    name: 'Login',
    components: {
        Wave, NInput, TopicoButton, NFormItem, NForm
    },
    setup() {
        const globalStore = useGlobalStore();
        const message = useMessage();
        // Login form
        const loginFormRef = ref<FormInst | null>(null);
        const loginFormValue = ref({
            email: '',
            password: ''
        });
        const loginRules = {
            email: {
                required: true,
                trigger: ['input', 'blur'],
                validator: emailValidator,
            },
            password: {
                required: true,
                message: 'please enter password',
                trigger: ['input', 'blur']
            }
        };

        // Signup form
        const signupFormRef = ref<FormInst | null>(null);
        const signupFormValue = ref({
            email: '',
            nickName: '',
            password: '',
            confirmPassword: ''
        });
        const signupRules = {
            email: {
                required: true,
                validator: emailValidator,
                trigger: ['input', 'blur']
            },
            password: {
                required: true,
                validator: (_rule: FormItemRule, value: string) => {
                    if (value.length === 0) {
                        return new Error('Password is required');
                    }
                    if (value.length < 6 || value.length > 16) {
                        return new Error('Password should be between 6 and 16 characters inclusive');
                    }
                    return true;
                },
                trigger: ['input', 'blur']
            },
            nickName: {
                required: true,
                message: 'please enter nickname',
                trigger: ['input', 'blur']
            }
        };

        const confirmPwdFeedback = computed(() => {
            if (signupFormValue.value.confirmPassword !== signupFormValue.value.password) {
                return 'passwords are not the same';
            }
            return '';
        });
        const confirmPwdStatus = computed(() => {
            if (signupFormValue.value.confirmPassword !== signupFormValue.value.password) {
                return 'error';
            }
            return 'success';
        });
        return {
            globalStore, loginFormRef, loginFormValue, loginRules,
            signupFormRef, signupFormValue, signupRules,
            confirmPwdFeedback, confirmPwdStatus, message
        };
    },
    mounted() {
        this.globalStore.setShowWaves(true);
        this.globalStore.setWaterLevel(window.innerHeight / 2);
    },
    data() {
        return {
            isSignup: false,
        }
    },
    computed: {
        redirect(): string {
            return (this.$route.query.redirect ?? '/') as string;
        }
    },
    methods: {
        handleClickSignup(e: MouseEvent) {
            e.preventDefault();
            this.isSignup = !this.isSignup;
        },
        handleLogin(e: MouseEvent) {
            e.preventDefault();
            this.loginFormRef?.validate(async errs => {
                if (errs && !!errs.length) {
                    this.message.error('login failed');
                    return;
                }
                try {
                    const user: User = await login(this.loginFormValue);
                    this.globalStore.setUser(user);
                    this.message.success('Login success, logged in as ' + user.nickName);
                    this.redirect && this.$router.push(this.redirect);    // redirect to previous page
                } catch (err: any) {
                    let msg;
                    if (err?.request?.status === 403) msg = 'Incorrect email or password';
                    else if (err?.request?.status === 500) msg = 'Internal server error';
                    else msg = err.message;
                    this.message.error(msg);
                }
            })
        },
        handleSignup(e: MouseEvent) {
            e.preventDefault();
            this.signupFormRef?.validate(async errs => {
                if (errs && !!errs.length) {
                    this.message.error('signup failed');
                    return;
                }
                try {
                    const user: User = await signup(this.signupFormValue);
                    this.globalStore.setUser(user);
                    this.message.success('signup success, logged in as ' + user.nickName);
                    this.redirect && this.$router.push(this.redirect);    // redirect to previous page
                } catch (err: any) {
                    this.message.error(err.message);
                }
            })
        }
    }
})
</script>

<style lang="scss" scoped>
$form-width: 20em;
$form-height: 30em;

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