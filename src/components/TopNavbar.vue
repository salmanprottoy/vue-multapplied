<template lang="">
  <el-card class="box-card">
    <el-header>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content">
            <el-row :gutter="20">
              <el-col :span="4">
                <div class="grid-content" style="font-size: 30px">
                  <i class="el-icon-s-fold hamburger"></i>
                </div>
              </el-col>
              <el-col :span="20">
                <div
                  class="grid-content"
                  style="
                    font-size: 15px;
                    color: #97a8be;
                    padding-top: 8px;
                    margin-left: 5px;
                    margin-right: 5px;
                  "
                >
                  <span>Enterprise Portal / Private WAN routers</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <el-row :gutter="10">
              <el-col :span="14">
                Space:
                <el-cascader
                  placeholder="ParentDiv"
                  :options="options"
                  clearable
                >
                </el-cascader>
              </el-col>
              <el-col :span="5">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="grid-content">
                      <font-awesome-icon
                        icon="code"
                        style="font-size: 30px"
                      ></font-awesome-icon>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content">
                      <i class="el-icon-bangzhu" style="font-size: 30px"></i>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content">
                      <i class="el-icon-setting" style="font-size: 30px"></i>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="5">
                <div class="grid-content">
                  <el-avatar icon="el-icon-user-solid"> </el-avatar>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-header>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
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
</style>
