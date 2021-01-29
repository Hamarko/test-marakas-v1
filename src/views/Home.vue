<template>  
  <div class = "container">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">        
        <button class="btn btn-outline-success" type="submit" @click.prevent="logout()">Logout</button>    
      </div>
    </nav>    
    <h1>Products</h1>
    <div class="row">
      <div class="input-group mb-3">
        <span class="input-group-text">Data from</span>        
        <date-picker v-model="startDate" ></date-picker>
        <span class="input-group-text">to</span>
        <date-picker v-model="endDate" ></date-picker>
      </div>    
    </div>
    <div class="row">
      <div class="input-group mb-3">      
        <span class="input-group-text">Price from</span>       
        <input v-model="priceFrom" class="form-control"/>
        <span class="input-group-text">to</span>    
        <input v-model="pricetTo" class="form-control" />
      </div>
    </div>
    <div class="row">
      <div class="input-group mb-3"> 
        <span class="input-group-text">Title</span>       
        <input v-model="title" class="form-control" />      
        <button class="btn btn-primary" @click.prevent="Filter()">Search</button>
      </div>
    </div>
    <hr>
    <div class="row">
      <bord
        v-for="data in pagesData"
        :key="data.id"
        :price="data.price"
        :thumbnail="data.thumbnail"
        :title="data.title"
      ></bord>
    </div> 
    <hr>
    <div class="row">
      <nav aria-label="..." >
        <ul class="pagination">       
          <pagination
            v-for="link in pagination" 
            :key= link.id          
            :label = link.label
            :url = link.url 
            :active = link.active 
            @page-changed="fetchProducts"        
          ></pagination>        
        </ul>
      </nav>  
    </div>    
  </div>
</template>
<script>
import api from '../api/api'
import token from '../api/token' 
import pagination from "../components/pagination"
import bord from "../components/bord"
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    pagination,
    bord,
    DatePicker
  },
  data () {
    return {     
      pagesData:[],
      pagination:[],
      url:'',
      startDate: null,
      endDate: null,
      priceFrom:'',
      pricetTo:'',
      title:'',
    }
  },  
  async created () {
    this.fetchLocalStoreg()
    console.log(this.params)
    try{
      const loadData = await api.get("http://dummy-api.d0.acom.cloud/api/products",{
        params: this.params    
      })        
      this.pagesData = loadData.data.data  
      this.renderPagination(loadData.data.links)     
    }catch (error) {
      return error.response
    }
  },
  computed: {
    // /api/products?from=2020-12-01&to=2020-12-29&price_from=10000&price_to=15000
    params(){      
      let params = {
        from:(this.startDate===null)?null:this.startDate.toJSON().split("T")[0],
        to:(this.endDate===null)?null:this.endDate.toJSON().split("T")[0],
        price_from:this.priceFrom,
        price_to:this.pricetTo,
        title:this.title,
      }          
      return  params
    }
  },
  methods: {
    fetchLocalStoreg(){
      let localParams = localStorage.getItem('params')
      if (localParams){
        localParams = JSON.parse(localParams)        
        if(localParams.from!==undefined&&localParams.from!==null)this.startDate = new Date(localParams.from)
        if(localParams.to!==undefined&&localParams.to!==null)this.endDate = new Date(localParams.to)
        if(localParams.price_from!==undefined)this.priceFrom = localParams.price_from
        if(localParams.price_to!==undefined)this.pricetTo = localParams.price_to
        if(localParams.title!==undefined)this.title =localParams.title
      } 
    },
    async fetchProducts(url){
      console.log(url)
      if(url){
        this.url = url
        try {
          let fechData = await api.get(url,{params: this.params})                   
          this.pagesData = fechData.data.data
          this.renderPagination(fechData.data.links)
        }catch (error) {
          return error.response
        } 
      }      
    },
    renderPagination(dataPagination){  
      let i = 0   
      dataPagination[0].label=dataPagination[0].label.split(' ')[1]
      dataPagination[dataPagination.length-1].label=dataPagination[dataPagination.length-1].label.split(' ')[0]
      dataPagination.map((item) =>{        
        item.id= i,
        item.label= String(item.label)        
        ++i
      })
      this.pagination = dataPagination
    },
    async Filter(){       
      localStorage.setItem('params', JSON.stringify({
        'from':this.startDate,
        'to':this.endDate,
        'price_from':this.priceFrom,
        'price_to':this.pricetTo,
        'title':this.title,
      }))     
      try{
        let fechData = await api.get("http://dummy-api.d0.acom.cloud/api/products",{
          params:this.params
        })
        this.pagesData = fechData.data.data
        this.renderPagination(fechData.data.links)
      }catch(error){
        return error
      }      
    },
    logout(){
      token.clear()
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
