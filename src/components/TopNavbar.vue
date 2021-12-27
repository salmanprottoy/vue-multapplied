<template lang="">
  <el-row>
    <el-col :span="12">
      <el-row>
        <el-col :span="4">
          <font-awesome-icon icon="file-import"></font-awesome-icon>
        </el-col>
        <el-col :span="20">
          <el-input v-model="input"></el-input>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="12">
      Space:
      <el-dropdown>
        <span class="el-dropdown-link">
          Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
export default {};
</script>
<style lang="scss"></style>
