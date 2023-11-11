<template>
  <div class="flex flex-col justify-between items-stretch">
    <div class="chat chat-start">
      <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <img
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <div class="chat-header">
        Obi-Wan Kenobi
        <time class="text-xs opacity-50">12:45</time>
      </div>
      <div class="chat-bubble">You were the Chosen One!</div>
      <div class="chat-footer opacity-50">Delivered</div>
    </div>
    <div class="chat chat-end">
      <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <img
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <div class="chat-header">
        Anakin
        <time class="text-xs opacity-50">12:46</time>
      </div>
      <div class="chat-bubble">I hate you!</div>
      <div class="chat-footer opacity-50">Seen at 12:46</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Default
const socket = useSocket();

// Custom
const io = useIO();

const connected = ref(false);

function test_connection() {
  const socket2 = io("http://localhost:3030");
  console.log("🚀 ~ onMounted ~ socket2:", socket2);
  socket2.on("connect", () => {
    connected.value = socket2.connected;
  });

  socket2.on("disconnect", () => {
    connected.value = socket2.connected;
  });
  socket2.on("message", (abc) => {
    console.log("🚀 ~ socket2.on ~ abc:", abc);
  });
  socket2.emit("message", { abc: "123" }, (data) => {
    console.log("🚀 ~ socket2.emit ~ data:", data);
  });
}

onMounted(() => {
  test_connection();
});
</script>
