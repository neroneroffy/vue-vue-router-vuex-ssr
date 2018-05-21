<template>
    <div id="app">
        <div class="cover"></div>
        <TodoHeader></TodoHeader>
        <Todo></Todo>
        <Footer></Footer>
    </div>
</template>

<script>
    import TodoHeader from './layout/header.vue';
    import Footer from './layout/footer.jsx';
    import Todo from './views/todo/todo.vue'
    export default {
        name: "app",
        data(){
            return {
                text:''
            }
        },
        components:{
            TodoHeader,
            Footer,
            Todo
        }
    }
</script>

<style scoped lang="stylus">
    #app{
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }
    #cover{
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        background-color #999
        opacity .9
        z-index -1
    }
</style>