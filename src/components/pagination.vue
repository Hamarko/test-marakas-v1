<template>
    <div class = "col-12.col-sm-12.col-lg-12">
        <li class="page-item" v-if="parseInt(label) === NaN && label !== '...'">
            <a class="page-link" @click.prevent="changePage(url)" aria-label="Previous"> {{label}}</a>
        </li> 
        <li  v-if="parseInt(label) === NaN && label === '...'">
            ...
        </li>
        <li class="page-item active" v-if="parseInt(label) !== NaN && active" >
            <a class="page-link" @click.prevent="changePage(url)"> {{label}} <span class="sr-only">(current)</span></a>
        </li>
        <li class="page-item" v-if="parseInt(label) !== NaN && !active">
            <a class="page-link" @click.prevent="changePage(url)">{{label}}</a>
        </li>
    </div>
</template>

<script>
export default {
    //{url: null, label: "&laquo; Previous", active: false}
    // {url: "http://dummy-api.d0.acom.cloud/api/products?page=1", label: 1, active: true}
    props: {
        url: String,        
        label:String,
        active: Boolean
    },  
    methods:  {        
        changePage: function(url) {
            this.$emit('page-changed', url)
        }           
    }
}
</script>

<style>

</style>