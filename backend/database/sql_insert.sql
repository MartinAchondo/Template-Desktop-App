INSERT INTO clients_info(
    rut 
) 
VALUES(
    :rut
); 


INSERT INTO clients_purchases(
    id_client,
    amount,
    date_purchase
) 
VALUES(
    :id_client,
    :amount,
    :date_purchase
); 
