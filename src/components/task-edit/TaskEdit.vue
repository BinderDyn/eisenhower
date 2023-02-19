<template>
  <div class="btn-group">
    <template v-if="editMode">
      <button class="confirm-button" @click="confirmUpdate()">
        <i class="fa fa-check"></i>
      </button>
      <button class="abort-button" @click="abortUpdate()">
        <i class="fa fa-xmark"></i>
      </button>
    </template>
    <template v-else>
      <button
        class="edit-button"
        @click="
          () => {
            edit();
            $emit('edit');
          }
        "
      >
        <i class="fa fa-pen"></i>
      </button>
      <button class="delete-button" @click="$emit('delete')">
        <i class="fa fa-trash"></i>
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TaskEditComponent",
  data() {
    return {
      editMode: false,
    };
  },
  methods: {
    edit() {
      this.editMode = !this.editMode;
    },
    confirmUpdate() {
      this.edit();
      this.$emit("confirm");
    },
    abortUpdate() {
      this.edit();
      this.$emit("abort");
    },
  },
  emits: ["edit", "abort", "confirm", "delete"],
});
</script>

<style lang="css">
.btn-group {
  position: absolute;
  display: flex;
  gap: 10px;
  right: 0;
  bottom: -8px;
}

.delete-button {
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: rgb(180, 0, 0);
  color: #ffffff;
  right: -20px;
  bottom: -40px;
  cursor: pointer;
}

.abort-button {
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: rgb(180, 0, 0);
  color: #ffffff;
  right: -20px;
  bottom: -40px;
  cursor: pointer;
}

.delete-button:hover,
.abort-button:hover {
  background-color: rgb(112, 0, 0);
}

.edit-button {
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: rgb(255, 153, 0);
  color: #ffffff;
  right: -20px;
  top: -38px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: rgb(186, 112, 0);
}

.confirm-button {
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: rgb(0, 255, 26);
  color: #ffffff;
  right: -20px;
  top: -38px;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: rgb(1, 177, 18);
}
</style>
