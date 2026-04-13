<template>
  <q-page class="page q-pa-md column q-gutter-y-md full-height">
    <q-breadcrumbs class="crumbs" separator-icon="chevron_right">
      <q-breadcrumbs-el icon="home" label="Início" to="/admin" />
      <q-breadcrumbs-el icon="group" label="Usuários" exact />
    </q-breadcrumbs>

    <div class="row justify-between items-center q-col-gutter-sm">
      <div class="col-12 col-sm-auto">
        <div class="text-h6 text-weight-bold safe-text page-title">Usuários</div>
      </div>

      <div class="col-12 col-sm-auto row justify-end">
        <q-chip outline class="chip">
          {{ usersPagination.rowsNumber }} registros
        </q-chip>
      </div>
    </div>

    <div class="table-container">
      <q-table
        :rows="usuariosRows"
        :columns="userColumns"
        row-key="_id"
        class="tbl"
        v-model:pagination="usersPagination"
        flat
        bordered
        wrap-cells
        :loading="loadingUsers"
        no-data-label="Nenhum usuário encontrado"
        loading-label="Carregando usuários..."
        @request="onUsersTableRequest"
      >
        <template #top-right>
          <q-btn
            unelevated
            icon="refresh"
            label="Atualizar usuários"
            class="act act-primary"
            :loading="loadingUsers"
            @click="buscarUsuarios()"
          />
        </template>

        <template #body-cell-planoAtual="props">
          <q-td :props="props">
            <q-chip
              dense
              :color="getPlanoColor(props.row.planoAtual)"
              text-color="white"
            >
              {{ props.row.planoAtual || '-' }}
            </q-chip>
          </q-td>
        </template>

        <template #body-cell-actions="props">
          <q-td :props="props">
            <div class="row items-center no-wrap absolute-right q-gutter-x-sm">
              <q-btn dense flat icon="account_circle" class="act act-primary" @click="visualizarUsuario(props.row)">
                <q-tooltip>Visualizar Usuário</q-tooltip>
              </q-btn>

              <q-btn
                dense
                flat
                :icon="isPremium(props.row.planoAtual) ? 'workspace_premium' : 'toggle_off'"
                :class="isPremium(props.row.planoAtual) ? 'act act-premium' : 'act act-free'"
                :loading="updatingUserId === props.row._id"
                @click="alternarPlano(props.row)"
              >
                <q-tooltip>
                  {{ isPremium(props.row.planoAtual) ? 'Tornar Gratuito' : 'Tornar Premium' }}
                </q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>

    <div class="row justify-between items-center q-col-gutter-sm q-pt-md">
      <div class="col-12 col-sm-auto">
        <div class="text-h6 text-weight-bold safe-text page-title">Leads</div>
      </div>

      <div class="col-12 col-sm-auto row justify-end">
        <q-chip outline class="chip">
          {{ leadsPagination.rowsNumber }} registros
        </q-chip>
      </div>
    </div>

    <div class="table-container">
      <q-table
        :rows="leadsRows"
        :columns="leadColumns"
        row-key="_id"
        class="tbl"
        v-model:pagination="leadsPagination"
        flat
        bordered
        wrap-cells
        :loading="loadingLeads"
        no-data-label="Nenhum lead encontrado"
        loading-label="Carregando leads..."
        @request="onLeadsTableRequest"
      >
        <template #top-right>
          <q-btn
            unelevated
            icon="refresh"
            label="Atualizar leads"
            class="act act-primary"
            :loading="loadingLeads"
            @click="buscarLeads()"
          />
        </template>

        <template #body-cell-origem="props">
          <q-td :props="props">
            <q-chip dense class="chip chip-origin">
              {{ props.row.origem || '-' }}
            </q-chip>
          </q-td>
        </template>

        <template #body-cell-createdAt="props">
          <q-td :props="props">
            {{ formatDate(props.row.createdAt) }}
          </q-td>
        </template>

        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense flat icon="visibility" class="act act-primary" @click="visualizarLead(props.row)">
              <q-tooltip>Visualizar Lead</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="dialogUsuario">
      <q-card class="detail-card">
        <q-card-section class="row items-center justify-between">
          <div class="text-h6 text-weight-bold">Detalhes do Usuário</div>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section v-if="usuarioSelecionado">
          <div class="detail-grid q-mb-md">
            <div class="detail-item">
              <div class="detail-label">Nome</div>
              <div class="detail-value">{{ usuarioSelecionado.name || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">E-mail</div>
              <div class="detail-value">{{ usuarioSelecionado.email || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Telefone</div>
              <div class="detail-value">{{ usuarioSelecionado.phone || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Perfil</div>
              <div class="detail-value">{{ usuarioSelecionado.perfil || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Plano</div>
              <div class="detail-value">{{ usuarioSelecionado.planoAtual || '-' }}</div>
            </div>

            <!-- <div class="detail-item">
              <div class="detail-label">Lucro</div>
              <div class="detail-value">{{ formatMoney(usuarioSelecionado.lucro) }}</div>
            </div> -->

            <div class="detail-item detail-item-full">
              <div class="detail-label">ID</div>
              <div class="detail-value break-all">{{ usuarioSelecionado._id || '-' }}</div>
            </div>
          </div>

          <q-separator class="q-my-md" />

          <div class="text-subtitle1 text-weight-bold q-mb-md">Alterar senha</div>

          <q-input
            v-model="passwordForm.newPassword"
            outlined
            bg-color="white"
            color="red-6"
            label="Nova senha"
            :type="showNewPassword ? 'text' : 'password'"
            class="q-mb-md"
          >
            <template #append>
              <q-icon
                :name="showNewPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showNewPassword = !showNewPassword"
              />
            </template>
          </q-input>

          <q-input
            v-model="passwordForm.confirmPassword"
            outlined
            bg-color="white"
            color="red-6"
            label="Confirmar nova senha"
            :type="showConfirmPassword ? 'text' : 'password'"
            class="q-mb-md"
          >
            <template #append>
              <q-icon
                :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </q-input>

          <div class="row q-col-gutter-sm">
            <div class="col-12 col-sm-6">
              <q-btn
                unelevated
                class="full-width act act-save"
                icon="lock_reset"
                label="Salvar nova senha"
                :loading="changingPassword"
                @click="alterarSenhaUsuario"
              />
            </div>

            <div class="col-12 col-sm-6">
              <q-btn
                unelevated
                class="full-width act act-danger"
                icon="delete_forever"
                :loading="deletingUser"
                label="Remover usuário"
                @click="removerUsuario"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogLead">
      <q-card class="detail-card">
        <q-card-section class="row items-center justify-between">
          <div class="text-h6 text-weight-bold">Detalhes do Lead</div>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section v-if="leadSelecionado">
          <div class="detail-grid q-mb-md">
            <div class="detail-item">
              <div class="detail-label">Nome</div>
              <div class="detail-value">{{ leadSelecionado.name || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">E-mail</div>
              <div class="detail-value">{{ leadSelecionado.email || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Origem</div>
              <div class="detail-value">{{ leadSelecionado.origem || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Criado em</div>
              <div class="detail-value">{{ formatDate(leadSelecionado.createdAt) }}</div>
            </div>

            <div class="detail-item detail-item-full">
              <div class="detail-label">Mensagem</div>
              <div class="detail-value break-all">{{ leadSelecionado.message || '-' }}</div>
            </div>

            <div class="detail-item detail-item-full">
              <div class="detail-label">ID</div>
              <div class="detail-value break-all">{{ leadSelecionado._id || '-' }}</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const $q = useQuasar()

const loadingUsers = ref(false)
const loadingLeads = ref(false)
const updatingUserId = ref('')
const changingPassword = ref(false)
const deletingUser = ref(false)

const dialogUsuario = ref(false)
const usuarioSelecionado = ref(null)

const dialogLead = ref(false)
const leadSelecionado = ref(null)

const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const usuariosRows = ref([])
const leadsRows = ref([])

const usersPagination = ref({
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0
})

const leadsPagination = ref({
  sortBy: 'createdAt',
  descending: true,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0
})

const userColumns = ref([
  {
    name: 'name',
    label: 'Nome',
    field: row => row.name,
    align: 'left',
    classes: 'sticky-col',
    headerClasses: 'sticky-col'
  },
  {
    name: 'perfil',
    label: 'Perfil',
    field: row => row.perfil,
    align: 'left'
  },
  {
    name: 'planoAtual',
    label: 'Plano',
    field: row => row.planoAtual,
    align: 'left'
  },
  {
    name: 'actions',
    label: 'Ações',
    align: 'center'
  }
])

const leadColumns = ref([
  {
    name: 'name',
    label: 'Nome',
    field: row => row.name,
    align: 'left',
    classes: 'sticky-col',
    headerClasses: 'sticky-col'
  },
  {
    name: 'email',
    label: 'E-mail',
    field: row => row.email,
    align: 'left'
  },
  {
    name: 'origem',
    label: 'Origem',
    field: row => row.origem,
    align: 'left'
  },
  {
    name: 'createdAt',
    label: 'Criado em',
    field: row => row.createdAt,
    align: 'left'
  },
  {
    name: 'actions',
    label: 'Ações',
    align: 'center'
  }
])

onMounted(() => {
  buscarUsuarios()
  buscarLeads()
})

function onUsersTableRequest(props) {
  usersPagination.value = {
    ...usersPagination.value,
    page: props.pagination.page,
    rowsPerPage: props.pagination.rowsPerPage,
    sortBy: props.pagination.sortBy,
    descending: props.pagination.descending
  }

  buscarUsuarios()
}

function onLeadsTableRequest(props) {
  leadsPagination.value = {
    ...leadsPagination.value,
    page: props.pagination.page,
    rowsPerPage: props.pagination.rowsPerPage,
    sortBy: props.pagination.sortBy,
    descending: props.pagination.descending
  }

  buscarLeads()
}

async function buscarUsuarios() {
  loadingUsers.value = true

  try {
    const { data } = await api.post('/admin/get-users', {
      page: usersPagination.value.page,
      limit: usersPagination.value.rowsPerPage
    })

    usuariosRows.value = Array.isArray(data?.data)
      ? data.data.map(mapUserToRow)
      : []

    usersPagination.value.rowsNumber = Number(data?.pagination?.total || 0)
    usersPagination.value.page = Number(data?.pagination?.page || 1)
    usersPagination.value.rowsPerPage = Number(data?.pagination?.limit || 10)
  } catch (error) {
    console.error('[ADMIN_GET_USERS_ERROR]', error)
    notifyNegative(error?.response?.data?.message || 'Erro ao buscar usuários')
  } finally {
    loadingUsers.value = false
  }
}

async function buscarLeads() {
  loadingLeads.value = true

  try {
    const { data } = await api.post('/admin/get-leads', {
      page: leadsPagination.value.page,
      limit: leadsPagination.value.rowsPerPage
    })

    leadsRows.value = Array.isArray(data?.data)
      ? data.data.map(mapLeadToRow)
      : []

    leadsPagination.value.rowsNumber = Number(data?.pagination?.total || 0)
    leadsPagination.value.page = Number(data?.pagination?.page || 1)
    leadsPagination.value.rowsPerPage = Number(data?.pagination?.limit || 10)
  } catch (error) {
    console.error('[ADMIN_GET_LEADS_ERROR]', error)
    notifyNegative(error?.response?.data?.message || 'Erro ao buscar leads')
  } finally {
    loadingLeads.value = false
  }
}

function mapUserToRow(user) {
  const role = String(user?.role || '').trim()

  return {
    _id: user?._id || '',
    name: user?.name || user?.nome || '-',
    email: user?.email || '-',
    phone: user?.phone || user?.telefone || '-',
    perfil: extractPerfil(user),
    planoAtual: normalizePlano(role),
    // lucro: Number(user?.lucro || 0)
  }
}

function mapLeadToRow(lead) {
  return {
    _id: lead?._id || '',
    name: lead?.name || '-',
    email: lead?.email || '-',
    message: lead?.message || '-',
    origem: lead?.origem || 'Direto',
    createdAt: lead?.createdAt || ''
  }
}

function extractPerfil(user) {
  if (user?.email) return user.email
  if (user?.phone) return user.phone
  return user?._id || '-'
}

function normalizePlano(role) {
  const normalized = String(role || '').toLowerCase()

  if (normalized.includes('premium')) return 'Plano Premium'
  if (normalized.includes('free') || normalized.includes('gratuito')) return 'Plano Gratuito'
  return role || 'Sem plano'
}

function isPremium(plano) {
  return String(plano || '').toLowerCase().includes('premium')
}

function formatMoney(value) {
  return Number(value || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function formatDate(value) {
  if (!value) return '-'

  try {
    return new Date(value).toLocaleString('pt-BR')
  } catch {
    return value
  }
}

function getPlanoColor(plano) {
  const normalized = String(plano || '').toLowerCase()

  if (normalized.includes('premium')) return 'orange-8'
  if (normalized.includes('free') || normalized.includes('gratuito')) return 'grey-6'
  if (normalized.includes('básico') || normalized.includes('basico')) return 'warning'
  return 'red-5'
}

function resetPasswordForm() {
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  showNewPassword.value = false
  showConfirmPassword.value = false
}

function visualizarUsuario(usuario) {
  usuarioSelecionado.value = { ...usuario }
  resetPasswordForm()
  dialogUsuario.value = true
}

function visualizarLead(lead) {
  leadSelecionado.value = { ...lead }
  dialogLead.value = true
}

async function alternarPlano(usuario) {
  const nextRole = isPremium(usuario.planoAtual) ? 'Plano Gratuito' : 'Plano Premium'
  const acao = isPremium(usuario.planoAtual) ? 'tornar gratuito' : 'tornar premium'

  try {
    const confirmed = await abrirConfirmacao(usuario, nextRole, acao)
    if (!confirmed) return

    updatingUserId.value = usuario._id

    await api.post(`/admin/give-role/${usuario._id}/${encodeURIComponent(nextRole)}`)

    const novoEhPremium = nextRole.toLowerCase().includes('premium')
    usuario.planoAtual = nextRole
    // usuario.lucro = novoEhPremium ? 49.9 : 0

    const index = usuariosRows.value.findIndex(item => item._id === usuario._id)
    if (index !== -1) {
      usuariosRows.value[index] = { ...usuario }
    }

    if (usuarioSelecionado.value?._id === usuario._id) {
      usuarioSelecionado.value = { ...usuario }
    }

    $q.notify({
      type: 'positive',
      message: 'Plano do usuário atualizado com sucesso.',
      icon: 'mdi-check-circle-outline',
      position: 'top',
      progress: true,
      actions: [{ icon: 'mdi-close', color: 'white', round: true }]
    })
  } catch (error) {
    if (error === 'cancelled') return
    console.error('[ADMIN_GIVE_ROLE_ERROR]', error)
    notifyNegative(error?.response?.data?.message || 'Erro ao atualizar plano do usuário')
  } finally {
    updatingUserId.value = ''
  }
}

async function alterarSenhaUsuario() {
  if (!usuarioSelecionado.value) return

  if (!passwordForm.value.newPassword?.trim()) {
    return notifyNegative('Informe a nova senha')
  }

  if (passwordForm.value.newPassword.trim().length < 4) {
    return notifyNegative('A nova senha deve ter pelo menos 4 caracteres')
  }

  if (passwordForm.value.newPassword.trim() !== passwordForm.value.confirmPassword.trim()) {
    return notifyNegative('A confirmação da senha não confere')
  }

  try {
    changingPassword.value = true

    const payload = {
      currentPassword: passwordForm.value.currentPassword.trim(),
      newPassword: passwordForm.value.newPassword.trim()
    }

    if (usuarioSelecionado.value.email && usuarioSelecionado.value.email !== '-') {
      payload.email = usuarioSelecionado.value.email.trim()
    } else if (usuarioSelecionado.value.phone && usuarioSelecionado.value.phone !== '-') {
      payload.phone = usuarioSelecionado.value.phone.trim()
    } else {
      return notifyNegative('Usuário sem e-mail ou telefone para localizar a conta')
    }

    const { data } = await api.put('/auth/change-password', payload)

    resetPasswordForm()

    $q.notify({
      type: 'positive',
      message: data?.message || 'Senha alterada com sucesso',
      icon: 'mdi-check-circle-outline',
      position: 'top',
      progress: true,
      actions: [{ icon: 'mdi-close', color: 'white', round: true }]
    })
  } catch (error) {
    console.error('[AUTH_CHANGE_PASSWORD_ERROR]', error)
    notifyNegative(error?.response?.data?.message || 'Erro ao alterar senha')
  } finally {
    changingPassword.value = false
  }
}

async function removerUsuario() {
  if (!usuarioSelecionado.value?._id) return

  try {
    const confirmed = await abrirConfirmacaoExclusao(usuarioSelecionado.value)
    if (!confirmed) return

    deletingUser.value = true

    const payload = {}

    if (usuarioSelecionado.value.email && usuarioSelecionado.value.email !== '-') {
      payload.email = usuarioSelecionado.value.email.trim()
    } else if (usuarioSelecionado.value.phone && usuarioSelecionado.value.phone !== '-') {
      payload.phone = usuarioSelecionado.value.phone.trim()
    } else {
      payload.userId = usuarioSelecionado.value._id
    }

    const { data } = await api.delete('/auth/delete-acc', { data: payload })

    usuariosRows.value = usuariosRows.value.filter(item => item._id !== usuarioSelecionado.value._id)
    usersPagination.value.rowsNumber = Math.max(0, usersPagination.value.rowsNumber - 1)

    dialogUsuario.value = false
    usuarioSelecionado.value = null
    resetPasswordForm()

    $q.notify({
      type: 'positive',
      message: data?.message || 'Usuário removido com sucesso',
      icon: 'mdi-check-circle-outline',
      position: 'top',
      progress: true,
      actions: [{ icon: 'mdi-close', color: 'white', round: true }]
    })
  } catch (error) {
    if (error === 'cancelled') return
    console.error('[AUTH_DELETE_ACC_ERROR]', error)
    notifyNegative(error?.response?.data?.message || 'Erro ao remover usuário')
  } finally {
    deletingUser.value = false
  }
}

function abrirConfirmacao(usuario, nextRole, acao) {
  return new Promise((resolve, reject) => {
    $q.dialog({
      title: 'Alterar plano',
      message: `Deseja ${acao} o usuário ${usuario.name || 'selecionado'} para ${nextRole}?`,
      cancel: true,
      persistent: true,
      ok: {
        label: 'Confirmar',
        color: 'primary',
        unelevated: true
      },
      cancel: {
        label: 'Cancelar',
        flat: true
      }
    })
      .onOk(() => resolve(true))
      .onCancel(() => reject('cancelled'))
  })
}

function abrirConfirmacaoExclusao(usuario) {
  return new Promise((resolve, reject) => {
    $q.dialog({
      title: 'Remover usuário',
      message: `Deseja remover permanentemente o usuário ${usuario.name || 'selecionado'}?`,
      cancel: true,
      persistent: true,
      ok: {
        label: 'Remover',
        color: 'negative',
        unelevated: true
      },
      cancel: {
        label: 'Cancelar',
        flat: true
      }
    })
      .onOk(() => resolve(true))
      .onCancel(() => reject('cancelled'))
  })
}

function notifyNegative(message) {
  $q.notify({
    type: 'negative',
    message,
    icon: 'mdi-alert-circle-outline',
    position: 'top',
    progress: true,
    actions: [{ icon: 'mdi-close', color: 'white', round: true }]
  })
}
</script>

<style scoped>
:global(html), :global(body), :global(#q-app) { overflow-x: clip; }
:global(.row > [class*="col-"]) { min-width: 0; }
.safe-text { overflow-wrap: anywhere; word-break: break-word; }

.page {
  background: transparent;
  color: #2a1d1d;
}

.page-title {
  color: #241717;
}

.crumbs {
  background: rgba(255,255,255,.88);
  border: 1px solid rgba(217,59,43,.08);
  padding: 10px 12px;
  border-radius: 14px;
}

.chip {
  color: #b13224;
  border-color: rgba(217,59,43,.20);
  background: rgba(255,107,87,.08);
}

.chip-origin {
  color: #9a3412;
}

.table-container {
  overflow-x: auto;
  max-width: 100%;
}

.tbl {
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255,255,255,.82);
  border: 1px solid rgba(217,59,43,.08);
  box-shadow: 0 14px 34px rgba(125,66,58,.06);
}

.tbl :deep(.q-table__top),
.tbl :deep(.q-table__bottom) {
  background: rgba(255,255,255,.70);
  color: #2a1d1d;
}

.tbl :deep(th) {
  color: #6f5653;
  background: rgba(255,248,246,.96);
  font-weight: 800;
}

.tbl :deep(td) {
  color: #2a1d1d;
}

.tbl :deep(.q-table__grid-item) {
  background: rgba(255,255,255,.90);
}

.tbl :deep(.sticky-col) {
  position: sticky;
  left: 0;
  z-index: 2;
  background: rgba(255,250,249,.98);
}

.act {
  border-radius: 12px;
  background: rgba(255,255,255,.86);
  border: 1px solid rgba(217,59,43,.08);
  margin-right: 6px;
}

.act-primary { color: #c43728; }
.act-premium { color: #d97706; }
.act-free { color: #64748b; }

.act-save {
  color: #ffffff;
  border-color: rgba(217,59,43,.18);
  background: linear-gradient(135deg, #d93b2b, #ff6b57);
}

.act-danger {
  color: #ffffff;
  border-color: rgba(239,68,68,.18);
  background: linear-gradient(135deg, #dc2626, #ef4444);
}

.detail-card {
  width: min(94vw, 720px);
  background: #fffdfc;
  color: #241717;
  border-radius: 20px;
  border: 1px solid rgba(217,59,43,.10);
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.detail-item {
  padding: 12px;
  border-radius: 12px;
  background: rgba(255,248,246,.90);
  border: 1px solid rgba(217,59,43,.08);
}

.detail-item-full {
  grid-column: 1 / -1;
}

.detail-label {
  font-size: .75rem;
  color: #8a6a67;
  margin-bottom: 4px;
}

.detail-value {
  font-weight: 700;
  color: #2a1d1d;
}

.break-all {
  word-break: break-word;
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .detail-item-full {
    grid-column: auto;
  }
}
</style>