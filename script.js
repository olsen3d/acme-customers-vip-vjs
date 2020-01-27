const customers = [
    { id: 1, name: 'moe', email: 'moe@gmail.com', isVIP: true, dateJoined: '07/05/2015'},
    { id: 2, name: 'larry', isVIP: true, email: 'larry@gmail.com', dateJoined: '01/01/2019'},
    { id: 4, name: 'shep', email: 'shep@gmail.com', dateJoined: '03/19/2000'},
   ];

   const sorter = (customers) => {
    return customers.map( customer => {
        const today = new Date()
        const past = new Date(customer.dateJoined)
        customer.tenure = ((today - past) / 86400000 / 365).toFixed(2)
        return customer
    }).sort((a, b) => a.tenure - b.tenure ).reverse()
   }

   const list = document.querySelector('#customers')
   const form = document.querySelector('form')

   form.addEventListener('submit', (ev) => {
       ev.preventDefault()
       const target = ev.target
       const name = target.querySelector("[name = 'name']")
       const dateJoined = target.querySelector("[name='date']")
       const isVIP = target.querySelector("[name = 'isVIP']"); 
       const customer = {
           name: name.value,
           dateJoined: new Date(dateJoined.value).toLocaleDateString(),
           isVIP: isVIP.checked
       }
       customers.push(customer)
       name.value = ''
       dateJoined.value = ''
       isVIP.checked = false
       render()
   })

   const render = () => {
       let sorted = sorter(customers)

       const html = sorted.map( customer => {
           return `<li class='${ customer.isVIP ? 'vip': ''}'>${customer.name} Joined on : ${customer.dateJoined} and has been here for ${customer.tenure} years</li>`
       }).join('')

       list.innerHTML = html
   }


   render()
