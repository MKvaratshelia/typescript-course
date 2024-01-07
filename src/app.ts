// enum Status {
//     Success = 'success',
//     Failed = 'failed',
// }

// interface Payment {
//     sum: number;
//     from: number;
//     to: number;
// }
// interface Req extends Payment {}

// interface ResSucces extends Payment {
//     databaseId: number;
// }

// interface ResFailed {
//     errorMessage: string;
//     errorCode: number;
// }

// interface DataSuccess {
//     status: Status.Success;
//     data: ResSucces;
// }
// interface DataFailed {
//     status: Status.Failed;
//     data: ResFailed;
// }

// type Res = DataSuccess | DataFailed;

// // type guard функция
// function isSuccess(res: Res): res is DataSuccess {
//     if (res.status === 'success') {
//         return true;
//     }
//     return false;
// }

// function getIdFromData(res: Res): number {
//     if (isSuccess(res)) {
//         return res.data.databaseId;
//     } else {
//         throw new Error(res.data.errorMessage);
//     }
// }

// Перегрузка функций
// class User {
//     skills: string[] = [];
//     addSkill(skill: string): void;
//     addSkill(skill: string[]): void;
//     addSkill(skillOrSkills: string | string[]): void {
//         if (typeof skillOrSkills === 'string') {
//             this.skills.push(skillOrSkills);
//         } else if (Array.isArray(skillOrSkills)) {
//             this.skills = this.skills.concat(skillOrSkills);
//         }
//     }
// }

// Необходимо сделать корзину (Cart) на сайте,
// которая имееет список продуктов (Product), добавленных в корзину
// и переметры доставки (Delivery). Для Cart реализовать методы:
// - Добавить продукт в корзину
// - Удалить продукт из корзины по ID
// - Посчитать стоимость товаров в корзине
// - Задать доставку
// - Checkout - вернуть что всё ок, если есть продукты и параметры доставки
// Product: id, название и цена
// Delivery: может быть как до дома (дата и адрес) или до пункта выдачи (дата = Сегодня и Id магазина)
// class Product {
//     constructor(public id: number, public price: number, public title: string) {}
// }

// class Delivery {
//     constructor(public date: Date) {}
// }

// class HomeDelivery extends Delivery {
//     constructor(date: Date, public address: string) {
//         super(date);
//     }
// }

// class ShopDelivery extends Delivery {
//     constructor(public shopId: number) {
//         super(new Date());
//     }
// }

// type DeliveryOptions = HomeDelivery | ShopDelivery;

// class Cart {
//     private products: Product[] = [];
//     private delivery: DeliveryOptions;

//     public addProduct(product: Product): void {
//         this.products.push(product);
//     }
//     public deleteProduct(id: number): void {
//         this.products = this.products.filter((p) => p.id !== id);
//     }
//     public setDelivery(delivery: DeliveryOptions): void {
//         this.delivery = delivery;
//     }
//     public getSum(): number {
//         const result = this.products.map((p: Product) => p.price).reduce((p1, p2) => p1 + p2);
//         return result;
//     }
//     public checkout() {
//         if (!this.products.length) {
//             throw new Error('товаров нет');
//         }

//         if (!this.delivery) {
//             throw new Error('не указан способ доставки');
//         }

//         return { success: true };
//     }
// }

// const cart = new Cart();
// const product1 = new Product(1, 1000, 'шапка');
// const product2 = new Product(2, 2000, 'штаны');
// const product3 = new Product(3, 5000, 'носки');
// const delivery = new HomeDelivery(new Date(), 'Питер');
// cart.addProduct(product1);
// cart.addProduct(product2);
// cart.addProduct(product3);
// cart.deleteProduct(2);
// cart.setDelivery(delivery);
// console.log(cart.checkout());
// console.log(cart.getSum());

// Необходимо реализовать абстрактный класс Logger с 2-мя методами
// абстрактным - log(message): void
// printDate - выводящий в log дату
// К нему необходимо сделать реальный класс, который бы имел метод: logWithDate,
// выводящий сначала дату, а потом заданное сообщение

// abstract class Logger {
//     abstract log(message: string): void;
//     printDate(date: Date): void {
//         this.log(date.toString());
//     }
// }

// class MyLog extends Logger {
//     log(message: string): void {
//         console.log(message);
//     }
//     public logWithDate(message: string) {
//         this.printDate(new Date());
//         this.log(message);
//     }
// }

// const myLog = new MyLog();
// myLog.logWithDate('Привет!!!');

//Дженерик
// function returnData<T>(data: T): T {
//     return data;
// }

// console.log(returnData([1, 2, 3]));

// Необходимо написать функцию сортировки любых
// объектов, которые имеют id по убыванию и по возрастанию

// ``` js
// const data = [
// 	{ id: 2, name: 'Петя' },
// 	{ id: 1, name: 'Вася' },
// 	{ id: 3, name: 'Надя' },
// ];

// interface ID {
//     id: number;
// }
// function sort<T extends ID>(data: T[], type: 'asc' | 'desc' = 'asc'): T[] {
//     let result = null;
//     if (type === 'desc') {
//         result = data.sort((a, b) => b.id - a.id);
//         return result;
//     }
//     result = data.sort((a, b) => a.id - b.id);
//     return result;
// }

// console.log(sort([{ id: 2 }, { id: 1 }, { id: 3 }], 'desc'));
// console.log(sort([{ id: 3 }, { id: 1 }, { id: 2 }]));

// const data = [
//     { group: 1, name: 'a' },
//     { group: 1, name: 'b' },
//     { group: 2, name: 'c' },
// ];

// interface IGroup<T> {
//     [key: string]: T[];
// }

// type key = number | string | symbol;

// function group<T extends Record<key, any>>(arr: T[], key: keyof T): IGroup<T> {
//     return arr.reduce<IGroup<T>>((map: IGroup<T>, item) => {
//         const itemKey = item[key];
//         let cur = map[itemKey];
//         if (Array.isArray(cur)) {
//             cur.push(item);
//         } else {
//             cur = [item];
//         }
//         map[itemKey] = cur;
//         return map;
//     }, {});
// }

// console.log(group(data, 'group'));

//mapped types
// interface IForm {
//     name: string;
//     password: string;
// }

// const form: IForm = {
//     name: 'Vasia',
//     password: '123',
// };

// type FormValidate<T> = {
//     [K in keyof T]:
//         | {
//               isValid: true;
//           }
//         | {
//               isValid: false;
//               errorMessage: 'Error';
//           };
// };

// const formValidation: FormValidate<IForm> = {
//     name: { isValid: true },
//     password: { isValid: false, errorMessage: 'Error' },
// };

interface IUserSwrvice {
    users: number;
    getUsersInDataBase: () => number;
}
@CreatedatDecorator
class UserService implements IUserSwrvice {
    @Max(100)
    users: number;
    @Catch({ rethrow: true })
    getUsersInDataBase(): number {
        throw new Error('Ошибка');
    }
}

// функция декоратор которая добавляет поле дата к классу
function CreatedatDecorator<T extends { new (...arg: any[]): {} }>(constructor: T) {
    return class extends constructor {
        createdat = new Date();
    };
}
// декоратор метода класса, изменяет метод getUsersInDataBase
function Catch({ rethrow }: { rethrow: boolean } = { rethrow: false }) {
    return (
        target: Object, // сам обьект
        propertyKey: string | symbol, // свойства
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
    ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
        const oldMethod = descriptor.value;
        descriptor.value = async (...args: any[]) => {
            try {
                return await oldMethod?.apply(target, args);
            } catch (e) {
                if (e instanceof Error) {
                    console.log(e);
                    if (rethrow) {
                        throw e;
                    }
                }
            }
        };
    };
}
// декоратор свойства
function Max(max: number) {
    return (target: Object, propertyKey: string | symbol) => {
        let value: number;
        const setter = (newValue: number) => {
            if (newValue > max) {
                console.log(`Нельзя установить значение больше ${max}`);
            } else {
                value = newValue;
            }
        };
        const getter = () => {
            return value;
        };

        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter,
        });
    };
}

const userService = new UserService();
userService.users = 1;
console.log(userService.users);
userService.users = 1000;
console.log(userService.users);

// так же существует декоратор параметров
