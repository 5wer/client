<template>
    <div class="about">
        <h1>editor</h1>
        <router-link to="/main">/main/home</router-link>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class ArticleEditor extends Vue {}
</script>
