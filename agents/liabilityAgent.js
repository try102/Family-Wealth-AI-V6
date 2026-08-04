/*

 

Family Wealth AI OS

V7.0 Final Build

Liability Agent

家庭负债管理核心模块

*/

import familyDatabase from "../database/familyDatabase.js";

const liabilityAgent = {

    name:

    "Liability Agent V7.0 Final",

    // ======================

    // 初始化

    // ======================

    init(){

        familyDatabase.init();

        return "Liability Ready";

    },

    // ======================

    // 获取数据

    // ======================

    getData(){

        return familyDatabase.getModule(

            "liability"

        );

    },

    // ======================

    // 添加负债

    // ======================

    add(data){

        let item={

            id:

            Date.now(),

            name:

            data.name || "",

            category:

            data.category || "其他",

            principal:

            Number(

                data.principal || 0

            ),

            interest:

            Number(

                data.interest || 0

            ),

            period:

            data.period || "",

            owner:

            data.owner || "",

            currency:

            data.currency || "CNY",

            note:

            data.note || ""

        };

        return familyDatabase.add(

            "liability",

            item

        );

    },

    // ======================

    // 查看

    // ======================

    view(){

        return this.getData();

    },

    // ======================

    // 单项分析

    // ======================

    analyze(item){

        let principal =

        Number(

            item.principal || 0

        );

        let interest =

        Number(

            item.interest || 0

        );

        return {

            ...item,

            annualInterest:

            principal

            *

            interest

            /

            100

        };

    },

    // ======================

    // 编辑

    // ======================

    edit(

        id,

        data

    ){

        return familyDatabase.update(

            "liability",

            id,

            data

        );

    },

    // ======================

    // 删除

    // ======================

    delete(id){

        return familyDatabase.remove(

            "liability",

            id

        );

    },

    // ======================

    // 汇总

    // ======================

    summary(){

        let list =

        this.getData();

        let totalLiability=0;

        let annualInterest=0;

        list.forEach(item=>{

            let result =

            this.analyze(item);

            totalLiability +=

            Number(

                result.principal || 0

            );

            annualInterest +=

            Number(

                result.annualInterest || 0

            );

        });

        return {

            count:

            list.length,

            totalLiability,

            annualInterest

        };

    }

};

export default liabilityAgent;
