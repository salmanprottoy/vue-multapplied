<template lang="">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#3f85ed"
      text-color="white"
      active-text-color="white"
      active-background-color="#5492ef"
      color="white"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-menu-item index="1" >
        <router-link to="/home" style="text-decoration: none; color: inherit;">
          <img src="https://ba-dev.turnium.com/media/navbar/login_eCGP2x0.png" style="height:25px; margin-right: 8px" />
            Enterprise Portal
        </router-link>
      </el-menu-item>
      <el-menu-item index="2 ">
        <router-link to="/home" style="text-decoration: none; color: inherit;">
         <font-awesome-icon icon="home" style=" margin-right: 8px"></font-awesome-icon>
            Dashboard
        </router-link>
      </el-menu-item>
      <el-submenu index="3">
          <template1 slot="title">
                <font-awesome-icon icon="server" style="margin-right: 8px"></font-awesome-icon>
                <span slot="title">
                    Hosts
                </span>
            </template1>
        <el-menu-item-group >
            <el-menu-item index="3-1"> Aggregators </el-menu-item>
            <el-menu-item index="3-2"> 
              <router-link to="/" style="text-decoration: none; color: inherit;">
                Private WAN routers
              </router-link></el-menu-item>
            <el-menu-item index="3-3"> Bonders </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4">
        <font-awesome-icon icon="project-diagram" style="margin-right: 8px"></font-awesome-icon>
        <span slot="title">
            Bonds
        </span>
      </el-menu-item>
      <el-menu-item index="5">
         <font-awesome-icon icon="file-alt" style="margin-right: 8px"></font-awesome-icon>
        <span slot="title">
            Spaces
        </span>
      </el-menu-item>
        <el-submenu index="6" >
            <template slot="title">
                <font-awesome-icon icon="file-contract" style=" margin-right: 8px"></font-awesome-icon>
                <span slot="title">
                    Policies
                </span>
            </template>
            <el-menu-item-group >
                <el-menu-item index="6-1">  Routing groups </el-menu-item>
                <el-menu-item index="6-2">  Quality of service profiles </el-menu-item>
                <el-menu-item index="6-3">  Classification profiles </el-menu-item>
                <el-menu-item index="6-4">  Flow collectors </el-menu-item>
                <el-menu-item index="6-5">  Mobile providers </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
  
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="scss">


    
</style>
