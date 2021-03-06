import { ReactElement, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AppStore } from "./appStore";
import { AppEnvType, IappOption, IAppStore, IstoreOption } from "./iapp";
import privateConfig from '@/private_app_config.json'
import { DebuffAction, EventEmitter } from "@mtgoo/ctool";
import React from "react";

/**
 * 项目内置浅封装框架
 */
export class MyApp<K extends object = {}, T extends object = {}> {
    /**
     * APP版本信息
     */
    version: string;

    /**
     * 项目的配置
     */
    config: K;
    /**
     * 项目的当前环境
     */
    env: AppEnvType;
    /**
     * 项目数据中心
     */
    store: AppStore<{ [P in keyof T]: { newValue: T[P]; oldValue: T[P]; }; }> & T;
    /**
     * 项目事件中心
     */
    appEventCenter: EventEmitter<IdataEvents>;

    /**
     * 启动项目,
     * @param root 项目组件根节点
     * @param opt 
     */
    private constructor(opt?: IappOption<T>) {
        console.info(`版本信息：${APP_VERSION}`);
        let { appEnv: app_env, appConfig, storeData: store_data, storeOpt, appDomain, onInit } = opt || {};
        //--------------------APP_VERSION
        this.version = APP_VERSION;
        (global as any).APP_VERSION = APP_VERSION;
        //--------------------APP_ENV
        this.env = app_env || process.env.APP_ENV || "prod" as any;
        (global as any).APP_ENV = this.env;
        //--------------------APP_CONFIG
        this.initConfig(appConfig);
        //-----------初始化APP_STORE
        let storeTarget = store_data ?? (_store_target ? new (_store_target as any)() : {})
        this.initAppStore(storeTarget as any, storeOpt);
        //-----------初始化APP_EVENTCENTER
        this.appEventCenter = new EventEmitter<IdataEvents>();
        //-----------修改domain
        if (appDomain) {
            this.initAppDomain(appDomain);
        }

        onInit?.();
    }

    private initConfig(config: Partial<IappConfig>) {
        switch (this.env) {
            case 'dev':
                this.config = { ...privateConfig.common, ...publicAppConfig.common, ...privateConfig.dev, ...publicAppConfig.dev, ...config } as K;
                break;
            case "test":
                this.config = { ...privateConfig.common, ...publicAppConfig.common, ...privateConfig.test, ...publicAppConfig.test, ...config } as K;
            case "prod":
            default:
                this.config = { ...privateConfig.common, ...publicAppConfig.common, ...privateConfig.prod, ...publicAppConfig.prod, ...config } as K;
        }
        (global as any).APP_CONFIG = this.config;
    }

    /**
     * 初始化数据中心
     */
    private initAppStore(data: T, opt?: IstoreOption) {
        let _store = AppStore.create(data, opt);
        this.store = _store;
        (global as any).APP_STORE = _store;
        return _store;
    }

    /**
     * 初始化app domain 配置
     */
    private initAppDomain(domain: string) {
        if (domain != null) {
            if (document.domain.indexOf(domain) >= 0) {
                document.domain = domain;
            }
        }
    }

    static start<T extends object = {}>(root: ReactElement, opt?: IappOption<T>) {
        let app = new MyApp(opt);
        ReactDOM.render(root, document.getElementById("root"));
        return app;
    }
}

var _store_target: new () => any;
export function MyStore(target: Function) {
    _store_target = target as any;
}

