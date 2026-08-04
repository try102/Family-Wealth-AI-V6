/*

 

Family Wealth AI OS

V7.0 Final Build

Income Agent

家庭收入管理核心模块

*/

import familyDatabase from "../database/familyDatabase.js";

const incomeAgent = {

    name:

    "Income Agent V7.0 Final",

    // ======================

    // 初始化

    // ======================

    init(){

        familyDatabase.init();

        return "Income Ready";

    },

    // ======================

    // 获取数据

    // ======================

    getData(){

        return familyDatabase.getModule(

            "income"

        );

    },

    // ======================

    // 保存

    // ======================

    save(data){

        return familyDatabase.saveModule(

            "income",

            data

        );

    },

    // ======================

    // 添加收入

    // ======================

    add(data){

        let income={

            id:

            Date.now(),

            name:

            data.name || "",

            category:

            data.category || "其他",

            source:

            data.source || "",

            amount:

            Number(

                data.amount || 0

            ),

            period:

            data.period || "年度",

            owner:

            data.owner || "",

            note:

            data.note || ""

        };

        return familyDatabase.add(

            "income",

            income

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

            "income",

            id,

            newData

        );

    },

    // ======================

    // 删除

    // ======================

    delete(id){

        return familyDatabase.remove(

            "income",

            id

        );

    },

    // ======================

    // 汇总

    // ======================

    summary(){

        let list =

        this.getData();

        let totalIncome=0;

        list.forEach(item=>{

            totalIncome +=

            Number(

                item.amount || 0

            );

        });

        return {

            count:

            list.length,

            totalIncome

        };

    }

};

export default incomeAgent;
