import Head from 'next/head';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';


export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [singleCustomer, setSingleCustomer] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    cp: '',
    income: '',
    civ: '',
    email: '',
    city: '',
  });

  useEffect(() => {
    //function to get all customers
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/customer');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des clients :', error);
      }
    };

    fetchCustomers();
  }, []);

  //function to get file
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //function to save file
  const handleSave = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('/api/addCustomer', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Fichier CSV envoyé avec succès');
          const response = await fetch('/api/customer');
          const data = await response.json();
          setCustomers(data);
        } else {
          console.error('Erreur lors de l\'envoi du fichier CSV');
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi du fichier CSV :', error);
      }
    } else {
      console.error('Aucun fichier sélectionné');
    }
  };

  //function to delete customer
  const handleDelete = async (customerId) => {
    console.log("customerId", customerId);
    try {
      await fetch(`/api/deleteCustomer?customerId=${customerId}`);
      const response = await fetch('/api/customer');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Erreur lors de la suppression du client :', error);
    }
  };

  //function to get single customer
  const getSingleCustomer = async (customerId) => {
    try {
      const response = await fetch(`/api/single_customer?customerId=${customerId}`);
      const data = await response.json();
      if (data.length != 0) {
        setSingleCustomer(data);
        setSelectedId(data.id)
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          dob: data.dob,
          cp: data.cp,
          income: data.income,
          civ: data.civ,
          email: data.email,
          city: data.city,
        })
      }

    } catch (error) {
      console.error('Erreur lors de la suppression du client :', error);
    }
  };

  //function to formatted the date
  const formattedDate = (formData) => {
    const date = formData.split('T')[0]
    return date
  }

  // const UpdateForm = () => {
  //   const [formData, setFormData] = useState({
  //     firstName: '',
  //     lastName: '',
  //     dob: '',
  //     cp: '',
  //     income: '',
  //     civ: '',
  //     email: '',
  //     city: '',
  //   });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  //function de modification
  const handleSubmit = async (event) => {
    console.log("selectedId", selectedId);
    let customerId = selectedId
    event.preventDefault();
    try {
      const response = await fetch(`/api/updateCustomer/${customerId}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du client');
      }

      const data = await response.json();
      console.log(data.message);

    } catch (error) {
      console.error('Erreur lors de la mise à jour du client:', error.message);
    }
  };

  return (
    <>
      <Head>
        <title>CSV APPLICATION</title>
      </Head>
      <div className='flex w-full h-screen py-20 px-20 flex-col gap-10'>
        <h1 className='text-3xl font-bold mb-8 text-center'>CSV APPLICATION</h1>
        <div className='flex  gap-10'>
          <div className='overflow-x-auto w-[80%]'>
            <table className='min-w-full border border-gray-300'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='border border-gray-300 p-2'>Civilité</th>
                  <th className='border border-gray-300 p-2'>Nom</th>
                  <th className='border border-gray-300 p-2'>Prénom(s)</th>
                  <th className='border border-gray-300 p-2'>Email</th>
                  <th className='border border-gray-300 p-2'>Date de Naissance</th>
                  <th className='border border-gray-300 p-2'>Ville</th>
                  <th className='border border-gray-300 p-2'>CP</th>
                  <th className='border border-gray-300 p-2'>Revenus</th>
                  <th className='border border-gray-300 p-2'>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className='border border-gray-300 p-2 text-center'>{customer.civ}</td>
                    <td className='border border-gray-300 p-2 text-center'>{customer.lastName}</td>
                    <td className='border border-gray-300 p-2 text-center'>{customer.firstName}</td>
                    <td className='border border-gray-300 p-2 text-center'>{customer.email}</td>
                    <td className='border border-gray-300 p-2 text-center'>{customer.dob}</td>
                    <td className='border border-gray-300 p-2 text-center'>{customer.city}</td>
                    <td className='border border-gray-300 p-2 text-center'>{customer.cp}</td>
                    <td className='border border-gray-300 p-2 text-center'>{customer.income}</td>
                    <td className='border border-gray-300 p-2 text-center'>
                      <button className='bg-blue-500 text-white px-4 py-2 rounded mr-2' onClick={() => getSingleCustomer(customer.id)}>Modifier</button>
                      <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={() => handleDelete(customer.id)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='bg-white shadow rounded p-8 max-w-md mx-auto'>
              <h2 className='text-2xl font-semibold mb-6'>Ajouter un fichier CSV</h2>
              <form encType="multipart/form-data">
                <label htmlFor="fileInput" className='block mb-4 text-gray-600'>Sélectionner un fichier CSV :</label>
                <input
                  id="fileInput"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className='w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                />
                <button
                  type="button"
                  onClick={handleSave}
                  className='mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none'
                >
                  Enregistrer
                </button>
              </form>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4 p-6 bg-white rounded-md shadow-md">
                <h2 className='text-2xl font-semibold mb-6'>Modifier</h2>
                <div className="mb-4">
                  <label htmlFor="firstName" className="text-gray-600">Prénom :</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-2 p-2 border border-gray-300 w-full rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="lastName" className="text-gray-600">Nom :</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    name="lastName"
                    onChange={handleChange}
                    className="mt-2 p-2 border border-gray-300 w-full rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="dob" className="text-gray-600">Date de Naissance :</label>
                  <input
                    type="date"
                    id="dob"
                    value={formattedDate(formData.dob)}
                    name="dob"
                    onChange={handleChange}
                    className="mt-2 p-2 border border-gray-300 w-full rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="cp" className="text-gray-600">Code Postal :</label>
                  <input
                    type="text"
                    id="cp"
                    value={formData.cp}
                    name="cp"
                    onChange={handleChange}
                    className="mt-2 p-2 border border-gray-300 w-full rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="income" className="text-gray-600">Revenus :</label>
                  <input
                    type="number"
                    id="income"
                    value={formData.income}
                    name="income"
                    onChange={handleChange}
                    className="mt-2 p-2 border border-gray-300 w-full rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="civ" className="text-gray-600">Civilité :</label>
                  <input
                    type="text"
                    id="civ"
                    value={formData.civ}
                    name="civ"
                    onChange={handleChange}
                    className="mt-2 p-2 border border-gray-300 w-full rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="text-gray-600">Email :</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    className="mt-2 p-2 border border-gray-300 w-full rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="city" className="text-gray-600">Ville :</label>
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    name="city"
                    onChange={handleChange}
                    className="mt-2 p-2 border border-gray-300 w-full rounded-md"
                  />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" >
                  Mettre à Jour
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
