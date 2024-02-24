# Partie B

##  Exercice 1 - Simple Hello World Server

#### Q1 - Create a simple hello world server

We created a JavaScript file then wrote this content to create a simple hello world server on port 3001 :

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/d2cec9c5-1f30-43d5-8d1b-19666625db8d)

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/23f521e0-ce95-4150-a7b5-c006455657dc)


#### Q2 - Create a DNS registry. This registry must be an express server that will have a getServer route. Route must repond the url of the server.

On the same JS file, we create a DNS registry but this time on port 3002

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/f4412f37-1fcd-487a-8cb4-2757fa8d5a23)

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/3d9e7433-55ee-446f-b303-c098b62d6983)


##  Exercice 2 - Simple e-commerce

#### Q3 
In order to implement the different routes, we create a database with mySQL that we name ecommerce. Then we create these 5 tables : 

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/6a83df25-0eff-4c42-b8a3-7f9e63e5fccf)
![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/79fb1b90-9bc3-4426-9670-81bd62545ce1)

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/e7117088-33e9-4fe2-8c5c-be4c29a572a1)

Once these tables are created, we insert data into them :

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/62470ff3-4ada-4800-897f-e9b442c0d6d9)

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/dc22ee09-6757-4bec-bb03-cd196f5b7d47)

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/1e617b30-2455-473a-9ed7-e2c978dcd911)

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/ecb190bd-0883-4633-baef-e44595f5a571)

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/07ba1300-1e47-40fe-9d41-9bb40143f492)


#### Q4 - Modify the server implementation to match API requirements.

The code corresponding to this part is in Ex2/app.js

#####  GET /products

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/60805f25-3272-401e-a292-244dd9df6d0d)


#####  GET /products/:id

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/9a22c2bd-e508-4d97-8bcd-a772b2c32fff)


#####  POST /products

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/271e5372-4951-4520-a73f-ff24d5c1270c)


#####  PUT /products/:id

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/d8ecc14e-906f-403d-973b-487453b09aa0)

This product has been added to the MySQL database

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/0e4824a9-4b2d-4d5d-bbe3-6fa1302d9be2)


#####  DELETE /products/:id

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/7a4e9cf0-f3a4-4622-a8c8-37d72d23d4c2)

This product has been deleted in the MySQL database

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/88621f6e-3fa1-46a8-9dfc-67a6dc6f602b)


#####  POST /orders

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/a0357c86-4b34-4ed1-9b0c-05c6200e4f72)


#####  GET /orders/:userId

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/da9484fe-b5e7-4fad-80de-4770c52a27ec)


#####  POST /cart/:userId

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/d85ba51b-9ab9-4984-bdd7-dbff730bf2ac)


#####  GET /cart/:userId

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/70360174-709e-42a8-a49a-af4a49d70464)


#####  DELETE /cart/:userId/item/:productId

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/b39db948-37f1-4106-915f-886719404a68)

Here in the order there were three items, a dress and two t-shirts. We have removed the two items with id 4 (t-shirt). When we redisplay the command we see that they have been deleted.

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/9109c433-1c4f-4c62-84db-166f56650c90)



Q5 - Create a simple front-end to interact with the server. Please note that style is not the priority here. You can use tools like Bootstrap or Ant Design if you want. Just don't spend too much time on this task.

This part is in the code Ex2/display.html

First of all you have to launch the server using the command: 
```javascript
node app.js
```
Then you have to launch the html.

![image](https://github.com/mariondss/Decentralization_Workshop3/assets/114142047/3b016f2c-4840-47ad-be2e-24077cd27d56)




Q6 - Simulate an issue/a stop of the API Server. What would be the result for the e-commerce user?

Fix it.
<details>
    <summary>💡 hint ?</summary>
    Modify the DNS.
</details>

Now imagine the e-commerce does 1000 orders/day, and the same inaccessibility occurs, but now not on the server but on the database. Let's imagine that your database is near a river and there is a flood, or there is a fire at our database data center. It will be painful, right? Let's see how to prevent this kind of issue.

#### Synchronous Mirroring

Synchronous mirroring, a cornerstone of high availability architectures, ensures real-time data availability across two (or in some cases three) storage systems – usually within the same site or across metro-clusters. When a write operation occurs, the system dispatches the data not only to the primary storage device but also, concurrently, to a mirror (or secondary) storage device. Thus, data redundancy is maintained constantly, ensuring a one-to-one data match across both storage systems.

The write operation is considered complete only after data is successfully stored in both the primary and mirrored storages. This establishes a consistent data state across devices, ensuring zero Recovery Point Objective (RPO) and Recovery Time Objective (RTO). Underneath this functionality lies a series of protocols and communication methodologies ensuring real-time data transfer, synchronization checks, failover, and failback operations. This also necessitates robust network infrastructures, often leveraging fiber channel or high-speed Ethernet, to mitigate latency.

Q7 - Modify the implementation to use synchronous mirroring. **Please copy your current file into a `Basic_Implementation` folder and make the following modifications in a new folder named `Synchronous_Mirroring`.**

#### Asynchronous Replication

Asynchronous replication ensures redundancy by periodically copying data from the primary to a secondary location – usually across long distances over a WAN connection. A key application of this is in disaster recovery. While the primary storage first acknowledges the write operation, data replication to the secondary storage might have a slight delay. Hence, it is asynchronous in nature. But, over time, the secondary storage is synced with the primary one, ensuring that a redundant copy is available (even if it might be slightly outdated compared to the primary copy).

Asynchronous replication employs a queue or buffer system. Once the primary storage acknowledges the write, the data is queued for replication. Advanced systems may implement algorithms to batch data, minimize network chatter, or prioritize data sequences. Change logs may be utilized to keep track of data states at specific intervals, allowing for periodic synchronization with secondary storage. This approach is especially prevalent in geographically dispersed disaster recovery architectures, where data is asynchronously replicated to remote sites.

Q8 - Adapt the implementation to use asynchronous replication. Do the implementation in a new folder named `Asynchronous-Replication`.


Q7-bis: implement synchronous mirroring using two differents database structures
