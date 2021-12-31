<template lang="">
  <el-container>
    <el-header>
      <el-row :gutter="10">
        <el-col :xs="6" :sm="10" :md="10" :lg="12" :xl="12">
          <div class="grid-content">
            <el-row :gutter="10">
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <div class="grid-content" style="font-size: 25px">
                  <i
                    class="el-icon-s-fold hamburger"
                    @click="drawer = true"
                  ></i>
                </div>
              </el-col>
              <el-col :xs="0" :sm="20" :md="20" :lg="20" :xl="20">
                <div class="grid-content-2">
                  <h1>
                    Enterprise Portal / Private WAN Routers
                    <span v-if="$route.params.id">
                      {{ "/ " + $route.params.id }}</span
                    >
                  </h1>
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
                  placeholder="ParentDiv"
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
    <div v-if="isMobile">
      <el-drawer
        title="Mobile"
        size="45%"
        :direction="direction"
        :visible.sync="drawer"
      >
        <span></span>
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
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ),
      options: [
        {
          value: "guide",
          label: "ParentDev",
        },
        {
          value: "component",
          label: "Component",
        },
        {
          value: "resource",
          label: "Resource",
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
  margin-top: 10px;
  padding: 5px;
  background-color: white;
  border: 1px black;
}
.grid-content-2 {
  font-size: 18px;
  color: #97a8be;
}
</style>
