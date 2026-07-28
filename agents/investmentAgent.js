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
