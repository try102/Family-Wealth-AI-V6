/*

 

Family Wealth AI OS

V7.0 Final Build

Assets Agent

家庭资产管理核心模块

*/

import familyDatabase from "../database/familyDatabase.js";

const assetsAgent = {

    name:

    "Assets Agent V7.0 Final",

    // ======================

    // 初始化

    // ======================

    init(){

        familyDatabase.init();

        return "Assets Ready";

    },

    // ======================

    // 获取数据

    // ======================

    getData(){

        return familyDatabase.getModule(

            "assets"

        );

    },

    // ======================

    // 保存

    // ======================

    save(data){

        return familyDatabase.saveModule(

            "assets",

            data

        );

    },

    // ======================

    // 添加资产

    // ======================

    add(data){

        let asset={

            id:

            Date.now(),

            name:

            data.name || "",

            category:

            data.category || "其他",

            type:

            data.type || "",

            owner:

            data.owner || "",

            country:

            data.country || "",

            currency:

            data.currency || "CNY",

            institution:

            data.institution || "",

            account:

            data.account || "",

            value:

            Number(

                data.value || 0

            ),

            note:

            data.note || ""

        };

        return familyDatabase.add(

            "assets",

            asset

        );

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

    edit(

        id,

        newData

    ){

        return familyDatabase.update(

            "assets",

            id,

            newData

        );

    },

    // ======================

    // 删除

    // ======================

    delete(id){

        return familyDatabase.remove(

            "assets",

            id

        );

    },

    // ======================

    // 汇总

    // ======================

    summary(){

        let list =

        this.getData();

        let totalValue=0;

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

    // 分类统计

    // ======================

    categorySummary(){

        let result={};

        this.getData()

        .forEach(item=>{

            let category =

            item.category || "其他";

            if(!result[category]){

                result[category]=0;

            }

            result[category]+=

            Number(

                item.value || 0

            );

        });

        return result;

    }

};

export default assetsAgent;
