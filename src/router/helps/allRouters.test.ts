import type { RouteRecordRaw } from 'vue-router/auto'
import { routerHelper } from './allRouters'

type _RouteRecordRaw = Omit<RouteRecordRaw, 'component' | 'children'> & {
  children?: _RouteRecordRaw[]
}
describe('createRouter', () => {
  it('should works', () => {
    const demoRouter: _RouteRecordRaw[] = [{
      children: [
        {
          children: [
            {
              alias: [],
              meta: {
                isKeepAlive: false,
                isTitle: '二级子路由',
              },
              name: 'OneTwoTwo',
              path: 'two',
            },
          ],
          meta: {
            isAffix: true,
            isTitle: '二级父路由',
          },
          name: 'two',
          path: 'two',
        },
        {
          alias: [],
          meta: {
            isKeepAlive: false,
            isTitle: '一级子路由',
          },
          name: 'OneOne',
          path: 'one',
        },
      ],
      meta: {
        isAffix: true,
        isTitle: '一级父路由',
      },
      name: '/one',
      path: '/one',
    }]
    const { allAffixRouters, allRouters, allUnKeepAliveRouters, createRouterHelper } = routerHelper()
    const resultRouter = createRouterHelper(demoRouter as RouteRecordRaw[])
    expect(allRouters.value).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [
                {
                  "alias": [],
                  "meta": {
                    "isKeepAlive": false,
                    "isTitle": "二级子路由",
                  },
                  "name": "OneTwoTwo",
                  "path": "two",
                },
              ],
              "meta": {
                "isAffix": true,
                "isTitle": "二级父路由",
              },
              "name": "two",
              "path": "two",
            },
            {
              "alias": [],
              "meta": {
                "isKeepAlive": false,
                "isTitle": "一级子路由",
              },
              "name": "OneOne",
              "path": "one",
            },
          ],
          "meta": {
            "isAffix": true,
            "isTitle": "一级父路由",
          },
          "name": "/one",
          "path": "/one",
        },
      ]
    `)
    expect(resultRouter).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [
                {
                  "alias": [],
                  "meta": {
                    "isKeepAlive": false,
                    "isTitle": "二级子路由",
                  },
                  "name": "OneTwoTwo",
                  "path": "two",
                },
              ],
              "meta": {
                "isAffix": true,
                "isTitle": "二级父路由",
              },
              "name": "two",
              "path": "two",
              "redirect": {
                "name": "OneTwoTwo",
              },
            },
            {
              "alias": [],
              "meta": {
                "isKeepAlive": false,
                "isTitle": "一级子路由",
              },
              "name": "OneOne",
              "path": "one",
            },
          ],
          "meta": {
            "isAffix": true,
            "isTitle": "一级父路由",
          },
          "name": "/one",
          "path": "/one",
          "redirect": {
            "name": "two",
          },
        },
      ]
    `)
    expect(allAffixRouters.value).toMatchInlineSnapshot(`
      [
        {
          "children": undefined,
          "meta": {
            "isAffix": true,
            "isTitle": "一级父路由",
          },
          "name": "/one",
          "path": "/one",
        },
        {
          "children": undefined,
          "meta": {
            "isAffix": true,
            "isTitle": "二级父路由",
          },
          "name": "two",
          "path": "two",
        },
      ]
    `)
    expect(allUnKeepAliveRouters.value).toMatchInlineSnapshot(`
      [
        {
          "alias": [],
          "meta": {
            "isKeepAlive": false,
            "isTitle": "二级子路由",
          },
          "name": "OneTwoTwo",
          "path": "two",
        },
        {
          "alias": [],
          "meta": {
            "isKeepAlive": false,
            "isTitle": "一级子路由",
          },
          "name": "OneOne",
          "path": "one",
        },
      ]
    `)
  })
})
