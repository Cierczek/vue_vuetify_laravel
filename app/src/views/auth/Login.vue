<template>


    <v-container
            class="fill-height"
            fluid
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    sm="8"
                    md="4"
            >
                <v-card class="elevation-12">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >
                        <v-toolbar-title>Login form</v-toolbar-title>
                        <v-spacer></v-spacer>

                    </v-toolbar>
                    <v-card-text>
                        <v-form
                                ref="login"
                                v-model="validLogin"
                                :lazy-validation="lazy">
                            <v-text-field
                                    label="Login"
                                    name="email"
                                    prepend-icon="mdi-account"
                                    type="email"
                                    v-model="email"
                                    :rules="emailRules"
                                    required
                            ></v-text-field>

                            <v-text-field
                                    id="password"
                                    label="Password"
                                    name="password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    v-model="password"
                                    :rules="passwordRules"
                                    required
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login()">Login</v-btn>
                    </v-card-actions>
                </v-card>
                <snackbar-component></snackbar-component>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
    import SnackbarComponent from '../../components/common/SnackbarComponent';

    export default {
        name: 'LoginComponent',
        computed: {
            isAuthenticated: function() {
                return this.$store.getters.isAuthenticated();
            },
        },
        data: () => ({
            validLogin: true,
            email: '',
            emailRules: [
                v => !!v || 'Login is required',
                v => /.+@.+\..+/.test(v) || 'Login must be valid e-mail',
            ],
            password: '',
            passwordRules: [v => !!v || 'Password is required'],
            lazy: false,
        }),
        components: {
            SnackbarComponent,
        },
        methods: {
            async login() {
                const user = {
                    email: this.email,
                    password: this.password,
                };

                try {
                    await this.$store.dispatch('login', {user});

                } catch (e) {
                    let errorKey = Object.keys(e.response.data.errors)[0];
                    this.$store.dispatch('snackbar/showSnack',
                        {
                            text: e.response.data.errors[errorKey].toString(), color: 'red',
                        });
                }
            },
        },
    };
</script>

<style scoped>

</style>