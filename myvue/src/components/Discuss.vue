<template>
    <div>
        <div>
            <QuillEditor v-model="content"/>
        </div>
    </div>
</template>

<script>
import QuillEditor from './Editor/index'
export default {
    components:{
        QuillEditor
    },
    data(){
        return{
            content:""
        }
    }
}
</script>