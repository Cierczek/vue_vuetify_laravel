<template>
    <div>
        <v-navigation-drawer
                v-model="drawer"
                app
                clipped
        >
            <v-list dense>
                <v-list-item
                        v-for="item in items"
                        :key="item.text"
                        link
                        :to="'/admin/' + item.action"
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-subheader class="mt-4 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
                <v-list>
                    <v-list-item
                            v-for="item in items2"
                            :key="item.text"
                            link
                    >
                        <v-list-item-avatar>
                            <img
                                    :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`"
                                    alt=""
                            >
                        </v-list-item-avatar>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item>
                </v-list>
                <v-list-item
                        class="mt-4"
                        link
                >
                    <v-list-item-action>
                        <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-title class="grey--text text--darken-1">Browse Channels</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon color="grey darken-1">mdi-cog</v-icon>
                    </v-list-item-action>
                    <v-list-item-title class="grey--text text--darken-1" @click="logout">Log Out</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                clipped-left
                dense
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-btn text href="/admin/">
                <v-icon
                        class="mx-4"
                        large
                >
                    mdi-laravel
                </v-icon>
                <v-toolbar-title class="mr-12 align-center">
                    <span class="title">Laravel</span>
                </v-toolbar-title>
            </v-btn>
            <v-spacer></v-spacer>
            <v-row
                    align="center"
                    style="max-width: 650px"
            >
                <v-text-field
                        :append-icon-cb="() => {}"
                        placeholder="Search..."
                        single-line
                        append-icon="mdi-magnify"
                        color="white"
                        hide-details
                ></v-text-field>
            </v-row>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        name: 'Navigation',
        data: () => ({
            drawer: null,
            items: [
                {icon: 'mdi-newspaper', text: 'Posts', action: 'posts'},
                {icon: 'mdi-content-copy', text: 'Pages', action: 'pages'},
                {icon: 'mdi-blur', text: 'Categories', action: 'categories'},
                {icon: 'mdi-account', text: 'Users', action: 'users'},
                {icon: 'mdi-account-box-outline', text: 'Roles', action: 'roles'},
            ],
            items2: [
                {picture: 28, text: 'Joseph'},
                {picture: 38, text: 'Apple'},
                {picture: 48, text: 'Xbox Ahoy'},
                {picture: 58, text: 'Nokia'},
                {picture: 78, text: 'MKBHD'},
            ],
        }),
        methods: {
            logout: function() {
                this.loading = true;
                this.$store.dispatch("logout");
            },
        },
        mounted() {
        },
    };
</script>

<style scoped>

</style>