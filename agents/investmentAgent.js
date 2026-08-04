/*

 

Family Wealth AI OS

V7.0 Final Build

Investment Agent

家庭投资管理核心模块

*/

import familyDatabase from "../database/familyDatabase.js";

const investmentAgent = {

    name:

    "Investment Agent V7.0 Final",

    // ======================

    // 初始化

    // ======================

    init(){

        familyDatabase.init();

        return "Investment Ready";

    },

    // ======================

    // 获取数据

    // ======================

    getData(){

        return familyDatabase.getModule(

            "investment"

        );

    },

    // ======================

    // 添加投资

    // ======================

    add(data){

        let item={

            id:

            Date.now(),

            name:

            data.name || "",

            ticker:

            data.ticker || "",

            type:

            data.type || "股票",

            buyDate:

            data.buyDate || "",

            buyPrice:

            Number(

                data.buyPrice || 0

            ),

            buyQuantity:

            Number(

                data.buyQuantity || 0

            ),

            sellDate:

            data.sellDate || "",

            sellPrice:

            Number(

                data.sellPrice || 0

            ),

            sellQuantity:

            Number(

                data.sellQuantity || 0

            ),

            currentPrice:

            Number(

                data.currentPrice || 0

            ),

            note:

            data.note || ""

        };

        return familyDatabase.add(

            "investment",

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

    // 剩余数量

    // ======================

    remainingQuantity(item){

        return (

            Number(item.buyQuantity || 0)

            -

            Number(item.sellQuantity || 0)

        );

    },

    // ======================

    // 成本

    // ======================

    cost(item){

        return (

            Number(item.buyPrice || 0)

            *

            Number(item.buyQuantity || 0)

        );

    },

    // ======================

    // 市值

    // ======================

    marketValue(item){

        return (

            this.remainingQuantity(item)

            *

            Number(item.currentPrice || 0)

        );

    },

    // ======================

    // 已实现收益

    // ======================

    realizedProfit(item){

        return (

            Number(item.sellPrice || 0)

            -

            Number(item.buyPrice || 0)

        )

        *

        Number(item.sellQuantity || 0);

    },

    // ======================

    // 未实现收益

    // ======================

    unrealizedProfit(item){

        return (

            Number(item.currentPrice || 0)

            -

            Number(item.buyPrice || 0)

        )

        *

        this.remainingQuantity(item);

    },

    // ======================

    // 分析

    // ======================

    analyze(item){

        let cost =

        this.cost(item);

        let realized =

        this.realizedProfit(item);

        let unrealized =

        this.unrealizedProfit(item);

        let total =

        realized

        +

        unrealized;

        return {

            ...item,

            remainingQuantity:

            this.remainingQuantity(item),

            marketValue:

            this.marketValue(item),

            cost,

            realizedProfit:

            realized,

            unrealizedProfit:

            unrealized,

            totalProfit:

            total,

            returnRate:

            cost>0

            ?

            (

                total

                /

                cost

                *

                100

            ).toFixed(2)

            :

            0

        };

    },

    // ======================

    // 投资组合

    // ======================

    inventory(){

        return this.getData()

        .map(

            item=>

            this.analyze(item)

        );

    },

    // ======================

    // 编辑

    // ======================

    edit(

        id,

        data

    ){

        return familyDatabase.update(

            "investment",

            id,

            data

        );

    },

    // ======================

    // 删除

    // ======================

    delete(id){

        return familyDatabase.remove(

            "investment",

            id

        );

    },

    // ======================

    // 汇总

    // ======================

    summary(){

        let list =

        this.inventory();

        let totalValue=0;

        let totalCost=0;

        let profit=0;

        list.forEach(item=>{

            totalValue +=

            Number(

                item.marketValue || 0

            );

            totalCost +=

            Number(

                item.cost || 0

            );

            profit +=

            Number(

                item.totalProfit || 0

            );

        });

        return {

            count:

            list.length,

            totalValue,

            totalCost,

            profit,

            returnRate:

            totalCost>0

            ?

            (

                profit

                /

                totalCost

                *

                100

            ).toFixed(2)

            :

            0

        };

    }

};

export default investmentAgent;
