<template>
    <v-app id="inspire">
        <Navigation></Navigation>
        <v-main>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import Navigation from '../../components/admin/NavigationComponent';

    export default {
        name: 'Admin',
        components: {Navigation},
    };
</script>

<style scoped>

</style>