/*

Family Wealth AI OS

V6.1 Stable Transaction Build

Investment Agent

投资交易账本兼容版

兼容 V5.4.1

*/

const investmentAgent = {

    name:

    "Investment Agent V6.1 Stable",

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

    // 剩余数量

    // ======================

    remainingQuantity(item){

        return (

            Number(

                item.buyQuantity || 0

            )

            -

            Number(

                item.sellQuantity || 0

            )

        );

    },

    // ======================

    // 买入成本

    // ======================

    buyAmount(item){

        return (

            Number(

                item.buyPrice || 0

            )

            *

            Number(

                item.buyQuantity || 0

            )

        );

    },

    // ======================

    // 卖出金额

    // ======================

    sellAmount(item){

        return (

            Number(

                item.sellPrice || 0

            )

            *

            Number(

                item.sellQuantity || 0

            )

        );

    },

    // ======================

    // 当前市值

    // ======================

    marketValue(item){

        return (

            this.remainingQuantity(item)

            *

            Number(

                item.currentPrice || 0

            )

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

            market:

            data.market || "",

            currency:

            data.currency || "USD",

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

    // 编辑

    // ======================

    edit(id,newData){

        let list =

        this.getData();

        let index =

        list.findIndex(

            item=>

            item.id===id

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

            item=>

            item.id!==id

        );

        this.save(list);

        return "deleted";

    },

    // ======================

    // 单项分析

    // ======================

    analyzeItem(item){

        let remain =

        this.remainingQuantity(item);

        let value =

        this.marketValue(item);

        let cost =

        this.buyAmount(item);

        let unrealized =

        value -

        (

            Number(item.buyPrice || 0)

            *

            remain

        );

        let realized =

        (

            Number(item.sellPrice || 0)

            -

            Number(item.buyPrice || 0)

        )

        *

        Number(item.sellQuantity || 0);

        return {

            ...item,

            remainingQuantity:

            remain,

            marketValue:

            value,

            unrealizedProfit:

            unrealized,

            realizedProfit:

            realized,

            totalProfit:

            realized + unrealized

        };

    },

    // ======================

    // 持仓

    // ======================

    inventory(){

        return this.getData()

        .map(

            item=>

            this.analyzeItem(item)

        );

    },

    // ======================

    // 汇总

    // ======================

    summary(){

        let list =

        this.getData();

        let totalValue=0;

        let totalCost=0;

        let profit=0;

        list.forEach(item=>{

            totalValue +=

            this.marketValue(item);

            totalCost +=

            this.buyAmount(item);

            profit +=

            this.analyzeItem(item)

            .totalProfit;

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

                profit /

                totalCost *

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

            maxRatio:

            0,

            advice:

            [

                "继续关注投资集中度"

            ]

        };

    }

};

export default investmentAgent;
