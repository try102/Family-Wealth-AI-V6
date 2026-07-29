/*

Family Wealth AI OS

V6.2 Stable Upgrade

Investment Agent

投资管理升级版

兼容 V5.4.1 / V6.1

*/

const investmentAgent = {

    name:

    "Investment Agent V6.2 Upgrade",

    // ======================

    // 初始化

    // ======================

    init(){

        if(

            !localStorage.getItem(

                "wealth_investments"

            )

        ){

            localStorage.setItem(

                "wealth_investments",

                JSON.stringify([])

            );

        }

        return "Investment Ready";

    },

    // ======================

    // 获取数据

    // ======================

    getData(){

        return JSON.parse(

            localStorage.getItem(

                "wealth_investments"

            )

            ||

            "[]"

        );

    },

    // ======================

    // 保存

    // ======================

    save(data){

        localStorage.setItem(

            "wealth_investments",

            JSON.stringify(data)

        );

    },

    // ======================

    // 添加投资

    // ======================

    add(data){

        let list =

        this.getData();

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

    // 当前市值

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

    // 单项分析

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

    // 持仓

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

    edit(id,newData){

        let list =

        this.getData();

        let index =

        list.findIndex(

            x=>

            x.id===id

        );

        if(index!==-1){

            list[index]={

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

            x=>

            x.id!==id

        );

        this.save(list);

        return "deleted";

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

    },

    // ======================

    // 风险接口

    // ======================

    riskSummary(){

        return {

            level:

            "中",

            advice:[

                "关注投资集中度"

            ]

        };

    }

};

export default investmentAgent;
