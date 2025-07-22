<template>
    <div class="roleplay-chat-room">
        <section
            class="roleplay-msgs-container overflow-auto flex flex-col gap-1 p-4 m-2 bg-base-100 shadow-lg ring-1"
        >
            <ul class="flex flex-col gap-4">
                <DyListItem
                    v-for="publicacao in publicacoes"
                    :key="publicacao.id"
                    :username="publicacao.idAutor"
                    :content="publicacao.content"
                ></DyListItem>
            </ul>
        </section>
        <label class="input input-bordered flex items-center gap-2">
            <input
                type="text"
                class="grow"
                v-model="typing"
                @keyup.enter="criarPublicacao"
            />

            <kbd class="kbd kbd-sm">Enter</kbd>
        </label>
    </div>
</template>

<script lang="ts" setup>
import type { TmdbCastMember } from '../../../main/Movies/interfaces';
import MessageImageProvider from '../../../main/Twaroom/components/MessageImageProvider.vue';
import type { iTwamessage } from '../../../main/Twaroom/dtos';
import { TwaroomService } from '../../../main/Twaroom/TwaroomService';
import { UserService } from '../../../main/User/UserService';
import { PrivateChatService } from '../../../main/PrivateChat/PrivateChatService';

const roomService = new TwaroomService();
const userService = new UserService();
const privateChatService = new PrivateChatService();

const route = useRoute();
const typing = ref('');

const user = ref({
    sender_user_id: 'id',
});

const url = computed(() => {
    const config = useRuntimeConfig();
    return `${config.public.BACKEND_URI}/publicacoes`;
});

const publicacoes = ref<{ content: string; idAutor: string; id: string }[]>([]);

onMounted(async () => {
    const user_id = await userService.tryGetRealUser();
    user.value.sender_user_id =
        user_id?._id || userService.getTabUserInfo()._id;

    publicacoes.value = await $fetch<any>(url.value, {
        method: 'GET',
    });
    console.log('=>(PublicacoesLista.vue:45) publicacoes', publicacoes);
});

async function criarPublicacao() {
    const criado = await $fetch<IUser>(url.value, {
        method: 'POST',
        body: { idAutor: user.value.sender_user_id, content: typing.value },
    });
    typing.value = '';
    console.log('=>(PublicacoesLista.vue:53) criado', criado);

    await utilsDelay(100, null);
    publicacoes.value = await $fetch<any>(url.value, {
        method: 'GET',
    });
}
</script>
<style scoped>
.roleplay-chat-room {
    flex: 1 0 auto;
}

.roleplay-msgs-container {
    max-height: 80vh;
    min-height: 80vh;
}
</style>
