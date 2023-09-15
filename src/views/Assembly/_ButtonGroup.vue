import { NButtonGroup } from 'naive-ui';
<template>
  <NCard title="按钮组">
    <NSpace>
      <NButtonGroup vertical>
        <RippleButton round>
          <SvgIcon />
          活着
        </RippleButton>
        <RippleButton ghost>
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
        vertical
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
          ghost
          round
        >
          <SvgIcon />
          够用
        </RippleButton>
      </NButtonGroup>
      <NButtonGroup size="small">
        <RippleButton
          round
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
        <RippleButton ghost>
          <SvgIcon />
          再吃
        </RippleButton>
        <RippleButton ghost>
          <SvgIcon />
          一颗
        </RippleButton>
        <RippleButton round>
          <SvgIcon />
          苹果
        </RippleButton>
      </NButtonGroup>
    </NSpace>
  </NCard>
</template>
