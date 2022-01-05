<template>
  <el-row>
    <el-col :xs="0" :sm="8" :md="5" :lg="4" :xl="4">
      <div class="grid-content">
        <Sidebar></Sidebar>
      </div>
    </el-col>
    <el-col :xs="24" :sm="16" :md="19" :lg="20" :xl="20">
      <div class="grid-content">
        <TopNavbar></TopNavbar>
        <div class="grid-content-2" style="margin: 25px">
          <div class="" style="display: flex; justify-content: space-between">
            <div style="color: #333333"><h3>Private Wan Router</h3></div>
            <div>
              <el-button plain icon="el-icon-circle-plus-outline">
                Add router</el-button
              >
            </div>
          </div>
          <div style="margin-top: 15px">
            <AllPrivateWanTable></AllPrivateWanTable>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
import TopNavbar from "@/components/TopNavbar.vue";
import AllPrivateWanTable from "@/components/AllPrivateWanTable.vue";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    TopNavbar,
    AllPrivateWanTable,
  },
};
</script>
