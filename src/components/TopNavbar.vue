<template lang="">
  <el-container >
    <el-header shadow>
      <el-row :gutter="10">
        <el-col :xs="6" :sm="10" :md="10" :lg="12" :xl="12">
          <div class="grid-content">
            <el-row :gutter="10">
              <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
                <div class="grid-content">
                  <i
                    class="el-icon-s-fold hamburger" 
                    @click="drawer = true"
                    style="font-size: 25px"
                  ></i>
                </div>
              </el-col>
              <el-col :xs="0" :sm="21" :md="21" :lg="21" :xl="21">
                <div class="grid-content" style="margin-left:5px;" >
                  <el-breadcrumb separator="/" >
                  <el-breadcrumb-item :to="{ path: '/home' }"> Enterprise Portal </el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/' }"> Private WAN Routers </el-breadcrumb-item>
                  <el-breadcrumb-item v-if="$route.params.id" > {{ $route.params.id }} </el-breadcrumb-item>
                  </el-breadcrumb>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :xs="16" :sm="14" :md="14" :lg="12" :xl="12">
          <div class="grid-content">
            <el-row :gutter="20">
              <el-col :xs="0" :sm="8" :md="12" :lg="14" :xl="16">
                Space:
                <el-cascader
                  placeholder="parentdev"
                  :options="options"
                  clearable
                >
                </el-cascader>
              </el-col>
              <el-col :xs="24" :sm="16" :md="12" :lg="10" :xl="8">
                <el-row :gutter="10">
                  <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <div class="grid-content">
                      <div class="grid-content">
                        <i
                          class="el-icon-s-operation"
                          style="font-size: 25px"
                        ></i>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <div class="grid-content">
                      <i class="el-icon-bangzhu" style="font-size: 25px"></i>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <div class="grid-content">
                      <i class="el-icon-setting" style="font-size: 25px"></i>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <div class="grid-content">
                      <el-dropdown>
                        <i class="el-icon-user" style="font-size: 25px"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>View Profile</el-dropdown-item>
                          <el-dropdown-item>Logout</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <div v-if="isMobile" style="background-color: rgb(84, 146, 239);">
      <el-drawer
        size="60%"
        :direction="direction"
        :visible.sync="drawer"
      >
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
          <div slot="title">
                <font-awesome-icon icon="server" style="margin-right: 8px"></font-awesome-icon>
                <span slot="title">
                    Hosts
                </span>
            </div>
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
                <el-menu-item index="6-1"> Routing groups </el-menu-item>
                <el-menu-item index="6-2"> Quality of service profiles </el-menu-item>
                <el-menu-item index="6-3"> Classification profiles </el-menu-item>
                <el-menu-item index="6-4"> Flow collectors </el-menu-item>
                <el-menu-item index="6-5"> Mobile providers </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
      </el-drawer>
    </div>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      direction: "ltr",
      isMobile:
        /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ),
      options: [
        {
          value: "guide",
          label: "parentdev",
        },
        {
          value: "badev",
          label: "BA-DEV",
        },
        {
          value: "batest",
          label: "BA-TEST",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.el-icon-s-unfold {
  color: black;
}
.el-container {
  padding: 25px 5px 0px 5px;
  background-color: white;
  border: 1px black;
}
.grid-content-2 {
  font-size: 18px;
  color: #97a8be;
}
.el-drawer{
  background-color: #3f85ed !important;
}
.el-drawer__close-btn{
  color:white !important;
}
</style>
