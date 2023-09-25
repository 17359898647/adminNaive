import { NButtonGroup } from 'naive-ui';
<template>
  <NCard title="按钮组">
    <NSpace>
      <NButtonGroup :vertical="true">
        <RippleButton :round="true">
          <SvgIcon />
          活着
        </RippleButton>
        <RippleButton :ghost="true">
          <SvgIcon />
          不多
        </RippleButton>
        <RippleButton>
          <SvgIcon />
          不少
        </RippleButton>
      </NButtonGroup>
      <NButtonGroup
        size="large"
        :vertical="true"
      >
        <RippleButton>
          <SvgIcon />
          幸福
        </RippleButton>
        <RippleButton>
          <SvgIcon />
          刚好
        </RippleButton>
        <RippleButton
          :ghost="true"
          :round="true"
        >
          <SvgIcon />
          够用
        </RippleButton>
      </NButtonGroup>
      <NButtonGroup size="small">
        <RippleButton
          :round="true"
          type="default"
        >
          <SvgIcon />
          活着
        </RippleButton>
        <RippleButton type="default">
          <SvgIcon />
          其实
        </RippleButton>
        <RippleButton type="default">
          <SvgIcon />
          很好
        </RippleButton>
      </NButtonGroup>
      <NButtonGroup>
        <RippleButton :ghost="true">
          <SvgIcon />
          再吃
        </RippleButton>
        <RippleButton :ghost="true">
          <SvgIcon />
          一颗
        </RippleButton>
        <RippleButton :round="true">
          <SvgIcon />
          苹果
        </RippleButton>
      </NButtonGroup>
    </NSpace>
  </NCard>
</template>
