/*

Family Wealth AI OS

V6.3.1 Upgrade Build

Assets Agent

Asset Classification System

Compatible with V6.2 Data

*/

const STORAGE_KEY = "wealth_assets_v6";

const ASSET_CATEGORIES = [

    "现金",

    "房产",

    "企业资产",

    "保险",

    "贵金属",

    "收藏品",

    "其他"

];

const assetsAgent = {

    name:

    "Assets Agent V6.3.1 Classification",

    // ======================

    // 初始化

    // ======================

    init(){

        let data =

        localStorage.getItem(

            STORAGE_KEY

        );

        if(!data){

            localStorage.setItem(

                STORAGE_KEY,

                JSON.stringify([])

            );

        }

        return "Assets V6.3 Ready";

    },

    // ======================

    // 分类列表

    // ======================

    categories(){

        return ASSET_CATEGORIES;

    },

    // ======================

    // 分类检查

    // ======================

    validateCategory(category){

        if(

            ASSET_CATEGORIES.includes(

                category

            )

        ){

            return category;

        }

        return "其他";

    },

    // ======================

    // 获取数据

    // ======================

    getData(){

        let data =

        localStorage.getItem(

            STORAGE_KEY

        );

        return JSON.parse(

            data || "[]"

        );

    },

    // ======================

    // 保存

    // ======================

    save(data){

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(data)

        );

    },

    // ======================

    // 添加资产

    // ======================

    add(asset){

        let list =

        this.getData();

        let item = {

            id:

            Date.now(),

            name:

            asset.name || "",

            category:

            this.validateCategory(

                asset.category

            ),

            type:

            asset.type || "",

            owner:

            asset.owner || "",

            country:

            asset.country || "",

            currency:

            asset.currency || "CNY",

            institution:

            asset.institution || "",

            account:

            asset.account || "",

            value:

            Number(

                asset.value || 0

            ),

            note:

            asset.note || ""

        };

        list.push(item);

        this.save(list);

        return item;

    },

    // ======================

    // 查看

    // ======================

    view(){

        return this.getData();

    },

    // ======================

    // 编辑

    // ======================

    edit(id,newData){

        let list =

        this.getData();

        let index =

        list.findIndex(

            item =>

            item.id === id

        );

        if(index !== -1){

            if(newData.category){

                newData.category =

                this.validateCategory(

                    newData.category

                );

            }

            list[index] = {

                ...list[index],

                ...newData

            };

        }

        this.save(list);

        return list;

    },

    // ======================

    // 删除

    // ======================

    delete(id){

        let list =

        this.getData();

        list =

        list.filter(

            item =>

            item.id !== id

        );

        this.save(list);

        return "deleted";

    },

    // ======================

    // 汇总

    // ======================

    summary(){

        let list =

        this.getData();

        let totalValue = 0;

        list.forEach(item=>{

            totalValue +=

            Number(

                item.value || 0

            );

        });

        return {

            count:

            list.length,

            totalValue

        };

    },

    // ======================

    // 分类配置分析

    // ======================

    allocationSummary(){

        let result = {};

        ASSET_CATEGORIES.forEach(

            category=>{

                result[category]=0;

            }

        );

        this.getData()

        .forEach(item=>{

            let key =

            this.validateCategory(

                item.category

            );

            result[key] +=

            Number(

                item.value || 0

            );

        });

        return result;

    },

    // ======================

    // 分类比例

    // 给 Wealth Engine 使用

    // ======================

    allocationRatio(){

        let summary =

        this.allocationSummary();

        let total = 0;

        Object.values(summary)

        .forEach(value=>{

            total += value;

        });

        let ratio = {};

        Object.keys(summary)

        .forEach(key=>{

            ratio[key] =

            total === 0 ?

            0 :

            Number(

                (

                summary[key] /

                total *

                100

                )

                .toFixed(2)

            );

        });

        return ratio;

    }

};

export default assetsAgent;
