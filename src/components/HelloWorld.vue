<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import {
  Renderer,
  Scene,
  Camera,
  PointLight,
  Box,
  LambertMaterial,
  PhongMaterial,
} from "troisjs";


export default defineComponent({
  name: "HelloWorld",
  components: {
    Renderer,
    Scene,
    Camera,
    PointLight,
    Box,
    LambertMaterial,
    PhongMaterial,
  },
  setup() {
    // const renderer = ref(null);
    const renderer = ref(null);
    const box = ref(null);

    onMounted(() => {
      renderer?.value?.onBeforeRender(() => {
        box.value.mesh.rotation.x += 0.01;
      });
    });
    return { renderer, box };
  },
});
</script>

<template>
  <div class="container">
    <Renderer resize="window" orbitCtrl ref="renderer">
      <Camera :position="{ z: 10 }" />
      <Scene background="#4DBA87">
        <PointLight :position="{ y: 50, z: 50 }" color="#ffffff" />
        <Box ref="box" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">
          <PhongMaterial />
        </Box>
      </Scene>
    </Renderer>
  </div>
</template>

<style>
canvas {
  position: fixed;
}
</style>
