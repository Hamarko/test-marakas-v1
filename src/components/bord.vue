<template>
  <div class="col-4">
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" v-bind:src="thumbnail" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{title}}</h5>
            <p class="card-text">{{price}}</p>           
        </div>
    </div>
  </div>    
</template>

<script>
export default {
    nema: "bord",
    props: {
        price: String,
        thumbnail: String,
        title: String
    }

}
</script>

<style>

</style>