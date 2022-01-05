<template lang="">
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
          <DetailsTable></DetailsTable>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import Sidebar from "@/components/Sidebar.vue";
import TopNavbar from "@/components/TopNavbar.vue";
import DetailsTable from "@/components/DetailsTable.vue";
export default {
  name: "Details",
  components: {
    Sidebar,
    TopNavbar,
    DetailsTable,
  },
};
</script>
<style lang="scss"></style>
