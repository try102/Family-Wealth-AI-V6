/*

Family Wealth AI OS

V6.1 Ledger Stable

Investment Agent

交易账本 + 库存管理 + 收益分析

*/

const investmentAgent = {

    name:

    "Investment Agent V6.1 Ledger Stable",

    investments: [],

    // ======================

    // 初始化

    // ======================

    init(){

        this.load();

        return "Investment Agent Ready";

    },

    // ======================

    // 数据读取

    // ======================

    load(){

        let data =

        localStorage.getItem(

            "wealth_investments"

        );

        if(data){

            this.investments =

            JSON.parse(data);

        }

        else{

            this.investments=[];

        }

        // 数据兼容修复

        this.investments =

        this.investments.map(item=>({

            ...item,

            sellDate:

            item.sellDate || "",

            sellPrice:

            Number(

                item.sellPrice || 0

            ),

            sellQuantity:

            Number(

                item.sellQuantity || 0

            ),

            buyQuantity:

            Number(

                item.buyQuantity || 0

            ),

            buyPrice:

            Number(

                item.buyPrice || 0

            ),

            currentPrice:

            Number(

                item.currentPrice || 0

            )

        }));

        this.save();

    },

    // ======================

    // 保存

    // ======================

    save(){

        localStorage.setItem(

            "wealth_investments",

            JSON.stringify(

                this.investments

            )

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
    📊 财富驾驶舱

净资产

¥0
总资产

¥0
总负债

¥0
年度收入

¥0
投资收益

¥0
财富评分

0
🏦 资产中心

添加资产
💳 负债中心

添加负债
💰 收入中心

添加收入
📈 投资中心

添加投资
🤖 AI CFO

生成财富报告
🧾 税务中心

等待接入
🏖 退休中心

等待接入
// ======================

// 投资汇总

// ======================

summary(){

    let totalCost=0;

    let totalValue=0;

    let realizedProfit=0;

    let unrealizedProfit=0;

    this.investments

    .forEach(item=>{

        totalCost +=

        this.buyAmount(item);

        totalValue +=

        this.marketValue(item);

        realizedProfit +=

        this.realizedProfit(item);

        unrealizedProfit +=

        this.unrealizedProfit(item);

    });

    let profit =

    realizedProfit

    +

    unrealizedProfit;

    return{

        count:

        this.investments.length,

        totalCost,

        totalValue,

        realizedProfit,

        unrealizedProfit,

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

        )

        .toFixed(2)

        :

        0

    };

},

// ======================

// Dashboard接口

// ======================

dashboardSummary(){

    return this.summary();

},

// ======================

// 风险分析

// ======================

riskSummary(){

    let data={};

    this.investments

    .forEach(item=>{

        let type =

        item.type || "其他";

        if(!data[type]){

            data[type]=0;

        }

        data[type]+=

        this.marketValue(item);

    });

    let total =

    Object.values(data)

    .reduce(

        (a,b)=>a+b,

        0

    );

    let maxCategory="无";

    let maxValue=0;

    Object.keys(data)

    .forEach(key=>{

        if(data[key]>maxValue){

            maxValue=data[key];

            maxCategory=key;

        }

    });

    let ratio =

    total>0

    ?

    (

        maxValue

        /

        total

        *

        100

    )

    .toFixed(2)

    :

    0;

    return{

        level:

        ratio>70

        ?

        "高"

        :

        "中",

        maxCategory,

        maxRatio:

        ratio,

        advice:[

            ratio>70

            ?

            "投资集中度较高，需要关注风险"

            :

            "投资配置较为均衡"

        ]

    };

},

// ======================

// 投资表现

// ======================

performanceSummary(){

    let profitCount=0;

    let lossCount=0;

    let totalRate=0;

    let count=0;

    this.investments

    .forEach(item=>{

        let cost =

        this.buyAmount(item);

        let profit =

        this.totalProfit(item);

        if(cost>0){

            let rate =

            profit

            /

            cost

            *

            100;

            totalRate += rate;

            count++;

            if(rate>0){

                profitCount++;

            }

            else if(rate<0){

                lossCount++;

            }

        }

    });

    return{

        profitCount,

        lossCount,

        averageReturnRate:

        count>0

        ?

        (

            totalRate

            /

            count

        )

        .toFixed(2)

        :

        0

    };

},

// ======================

// 综合分析

// ======================

analyze(){

    return{

        summary:

        this.summary(),

        inventory:

        this.inventory(),

        risk:

        this.riskSummary(),

        performance:

        this.performanceSummary()

    };

}

};

export default investmentAgent;
