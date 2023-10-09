<template>
  <NCard title="普通按钮">
    <NSpace>
      <RippleButton :strong="true">
        Default
      </RippleButton>
      <RippleButton
        :strong="true"
        type="tertiary"
      >
        Tertiary
      </RippleButton>
      <RippleButton
        :strong="true"
        type="primary"
      >
        Primary
      </RippleButton>
      <RippleButton
        :strong="true"
        type="info"
      >
        Info
      </RippleButton>
      <RippleButton
        :strong="true"
        type="success"
      >
        Success
      </RippleButton>
      <RippleButton
        :strong="true"
        type="warning"
      >
        Warning
      </RippleButton>
      <RippleButton
        :strong="true"
        type="error"
      >
        Error
      </RippleButton>
      <RippleButton
        :round="true"
        :strong="true"
      >
        Default
      </RippleButton>
      <RippleButton
        :round="true"
        :strong="true"
        type="primary"
      >
        Primary
      </RippleButton>
      <RippleButton
        :round="true"
        :strong="true"
        type="info"
      >
        Info
      </RippleButton>
      <RippleButton
        :round="true"
        :strong="true"
        type="success"
      >
        Success
      </RippleButton>
      <RippleButton
        :round="true"
        :strong="true"
        type="warning"
      >
        Warning
      </RippleButton>
      <RippleButton
        :round="true"
        :strong="true"
        type="error"
      >
        Error
      </RippleButton>
      <RippleButton
        :circle="true"
        :secondary="true"
        :strong="true"
      >
        <template #icon>
          <SvgIcon lineIcon="icon-mdi:square-inc-cash" />
        </template>
      </RippleButton>
      <RippleButton
        :circle="true"
        :secondary="true"
        :strong="true"
        type="primary"
      >
        <template #icon>
          <SvgIcon lineIcon="icon-mdi:square-inc-cash" />
        </template>
      </RippleButton>
      <RippleButton
        :circle="true"
        :secondary="true"
        :strong="true"
        type="info"
      >
        <template #icon>
          <SvgIcon lineIcon="icon-mdi:square-inc-cash" />
        </template>
      </RippleButton>
      <RippleButton
        :circle="true"
        :secondary="true"
        :strong="true"
        type="success"
      >
        <template #icon>
          <SvgIcon lineIcon="icon-mdi:square-inc-cash" />
        </template>
      </RippleButton>
      <RippleButton
        :circle="true"
        :secondary="true"
        :strong="true"
        type="warning"
      >
        <template #icon>
          <SvgIcon lineIcon="icon-mdi:square-inc-cash" />
        </template>
      </RippleButton>
      <RippleButton
        :circle="true"
        :secondary="true"
        :strong="true"
        type="error"
      >
        <template #icon>
          <SvgIcon lineIcon="icon-mdi:square-inc-cash" />
        </template>
      </RippleButton>
    </NSpace>
  </NCard>
</template>
