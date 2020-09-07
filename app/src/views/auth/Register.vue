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
                        <v-toolbar-title>Register form</v-toolbar-title>
                        <v-spacer></v-spacer>

                    </v-toolbar>
                    <v-card-text>
                        <v-form
                                ref="register"
                                v-model="validRegister"
                                :lazy-validation="lazy">
                            <v-text-field
                                    label="name"
                                    name="name"
                                    prepend-icon="mdi-account"
                                    type="email"
                                    v-model="name"
                                    :rules="nameRules"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    label="Login"
                                    name="email"
                                    prepend-icon="mdi-email"
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
                            <v-text-field
                                    id="password_confirmation"
                                    label="Password Confirmation"
                                    name="password_confirmation"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    v-model="password_confirmation"
                                    :rules="passwordRules"
                                    required
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="register()">Register</v-btn>
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
        name: 'RegisterComponent',
        computed: {
            isAuthenticated: function() {
                return this.$store.getters.isAuthenticated();
            },
        },
        data: () => ({
            validRegister: true,
            name: '',
            nameRules: [
                v => !!v || 'Login is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'Login is required',
                v => /.+@.+\..+/.test(v) || 'Login must be valid e-mail',
            ],
            password: '',
            password_confirmation: '',
            passwordRules: [v => !!v || 'Password is required'],
            lazy: false,
        }),
        components: {
            SnackbarComponent,
        },
        methods: {
            async register() {
                const user = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                };

                try {
                    await this.$store.dispatch('register', {user});

                } catch (e) {
                    let errorKey = Object.keys(e.response.data.errors)[0];
                    /*this.snackbarText = e.response.data.errors[errorKey].toString();
                    this.snackbar = true;*/

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