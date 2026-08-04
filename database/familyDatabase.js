/*

 

Family Wealth AI OS

V7.0 Final Build

Family Database

家庭财富统一数据库

*/

const DATABASE_KEY = "family_wealth_database_v7";

const familyDatabase = {

    name:

    "Family Wealth Database V7.0 Final",

    // ======================

    // 初始化数据库

    // ======================

    init(){

        let data =

        localStorage.getItem(

            DATABASE_KEY

        );

        if(!data){

            let database = {

                family:{

                    members:[]

                },

                assets:[],

                liabilities:[],

                income:[],

                investments:[],

                goals:[],

                retirement:{

                    enabled:false

                },

                tax:{

                    records:[]

                },

                created:

                new Date()

                .toISOString()

            };

            localStorage.setItem(

                DATABASE_KEY,

                JSON.stringify(database)

            );

        }

        return "Database Ready";

    },

    // ======================

    // 获取全部数据

    // ======================

    get(){

        return JSON.parse(

            localStorage.getItem(

                DATABASE_KEY

            )

            ||

            "{}"

        );

    },

    // ======================

    // 保存全部数据

    // ======================

    save(data){

        localStorage.setItem(

            DATABASE_KEY,

            JSON.stringify(data)

        );

        return true;

    },

    // ======================

    // 获取模块数据

    // ======================

    getModule(module){

        let data =

        this.get();

        return data[module]

        ||

        [];

    },

    // ======================

    // 保存模块数据

    // ======================

    saveModule(

        module,

        value

    ){

        let data =

        this.get();

        data[module]=value;

        this.save(data);

        return true;

    },

    // ======================

    // 添加记录

    // ======================

    add(

        module,

        item

    ){

        let list =

        this.getModule(

            module

        );

        item.id =

        item.id

        ||

        Date.now();

        list.push(item);

        this.saveModule(

            module,

            list

        );

        return item;

    },

    // ======================

    // 编辑记录

    // ======================

    update(

        module,

        id,

        newData

    ){

        let list =

        this.getModule(

            module

        );

        let index =

        list.findIndex(

            item=>

            item.id===id

        );

        if(index!==-1){

            list[index]={

                ...

                list[index],

                ...

                newData

            };

        }

        this.saveModule(

            module,

            list

        );

        return list;

    },

    // ======================

    // 删除记录

    // ======================

    remove(

        module,

        id

    ){

        let list =

        this.getModule(

            module

        );

        list =

        list.filter(

            item=>

            item.id!==id

        );

        this.saveModule(

            module,

            list

        );

        return true;

    },

    // ======================

    // 清空数据库

    // ======================

    reset(){

        localStorage.removeItem(

            DATABASE_KEY

        );

        return "Database Reset";

    }

};

export default familyDatabase;
