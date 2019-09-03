<template>
  <div class="hello">
    <DataGrid :data='data' style='height:250px'>
      <GridColumn field='itemid' title='Item ID'></GridColumn>
      <GridColumn field='name' title='Name'></GridColumn>
      <GridColumn field='listprice' title='List Price' align='right'></GridColumn>
      <GridColumn field='unitcost' title='Unit Cost' align='right'></GridColumn>
      <GridColumn field='attr' title='Attribute' width='30%'></GridColumn>
      <GridColumn field='status' title='Status' align='center'></GridColumn>
    </DataGrid>
    <ComboGrid
        valueField='itemid'
        textField='name'
        v-model='value'
        :data='data1'
        :multiple="true"
        :panelStyle="{width:'500px'}">
      <DataGrid slot='grid' :border='false'>
        <GridColumn field='itemid' title='Item ID'></GridColumn>
        <GridColumn field='name' title='Name'></GridColumn>
        <GridColumn field='listprice' title='List Price' align='right'></GridColumn>
        <GridColumn field='unitcost' title='Unit Cost' align='right'></GridColumn>
        <GridColumn field='attr' title='Attribute' width='30%'></GridColumn>
        <GridColumn field='status' title='Status' align='center'></GridColumn>
      </DataGrid>
    </ComboGrid>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      value: '',
      data: [
        {
          'code': 'FI-SW-01',
          'name': 'Koi',
          'unitcost': 10.00,
          'status': 'P',
          'listprice': 36.50,
          'attr': 'Large',
          'itemid': 'EST-1'
        },
        {
          'code': 'K9-DL-01',
          'name': 'Dalmation',
          'unitcost': 12.00,
          'status': 'P',
          'listprice': 18.50,
          'attr': 'Spotted Adult Female',
          'itemid': 'EST-10'
        },
        {
          'code': 'RP-SN-01',
          'name': 'Rattlesnake',
          'unitcost': 12.00,
          'status': 'P',
          'listprice': 38.50,
          'attr': 'Venomless',
          'itemid': 'EST-11'
        },
        {
          'code': 'RP-SN-01',
          'name': 'Rattlesnake',
          'unitcost': 12.00,
          'status': 'P',
          'listprice': 26.50,
          'attr': 'Rattleless',
          'itemid': 'EST-12'
        },
        {
          'code': 'RP-LI-02',
          'name': 'Iguana',
          'unitcost': 12.00,
          'status': 'P',
          'listprice': 35.50,
          'attr': 'Green Adult',
          'itemid': 'EST-13'
        },
        {
          'code': 'FL-DSH-01',
          'name': 'Manx',
          'unitcost': 12.00,
          'status': 'P',
          'listprice': 158.50,
          'attr': 'Tailless',
          'itemid': 'EST-14'
        },
        {
          'code': 'FL-DSH-01',
          'name': 'Manx',
          'unitcost': 12.00,
          'status': 'P',
          'listprice': 83.50,
          'attr': 'With tail',
          'itemid': 'EST-15'
        },
        {
          'code': 'FL-DLH-02',
          'name': 'Persian',
          'unitcost': 12.00,
          'status': 'P',
          'listprice': 23.50,
          'attr': 'Adult Female',
          'itemid': 'EST-16'
        },
        {
          'code': 'FL-DLH-02',
          'name': 'Persian',
          'unitcost': 12.00,
          'status': 'P',
          'listprice': 89.50,
          'attr': 'Adult Male',
          'itemid': 'EST-17'
        },
        {
          'code': 'AV-CB-01',
          'name': 'Amazon Parrot',
          'unitcost': 92.00,
          'status': 'P',
          'listprice': 63.50,
          'attr': 'Adult Male',
          'itemid': 'EST-18'
        }
      ],
      data1: [
        {
          code: 'FI-SW-01',
          name: 'Koi',
          unitcost: 10.0,
          status: 'P',
          listprice: 36.5,
          attr: 'Large',
          itemid: 'EST-1'
        },
        {
          code: 'K9-DL-01',
          name: 'Dalmation',
          unitcost: 12.0,
          status: 'P',
          listprice: 18.5,
          attr: 'Spotted Adult Female',
          itemid: 'EST-10'
        },
        {
          code: 'RP-SN-01',
          name: 'Rattlesnake',
          unitcost: 12.0,
          status: 'P',
          listprice: 38.5,
          attr: 'Venomless',
          itemid: 'EST-11'
        },
        {
          code: 'RP-SN-01',
          name: 'Rattlesnake',
          unitcost: 12.0,
          status: 'P',
          listprice: 26.5,
          attr: 'Rattleless',
          itemid: 'EST-12'
        },
        {
          code: 'RP-LI-02',
          name: 'Iguana',
          unitcost: 12.0,
          status: 'P',
          listprice: 35.5,
          attr: 'Green Adult',
          itemid: 'EST-13'
        },
        {
          code: 'FL-DSH-01',
          name: 'Manx',
          unitcost: 12.0,
          status: 'P',
          listprice: 158.5,
          attr: 'Tailless',
          itemid: 'EST-14'
        },
        {
          code: 'FL-DSH-01',
          name: 'Manx',
          unitcost: 12.0,
          status: 'P',
          listprice: 83.5,
          attr: 'With tail',
          itemid: 'EST-15'
        },
        {
          code: 'FL-DLH-02',
          name: 'Persian',
          unitcost: 12.0,
          status: 'P',
          listprice: 23.5,
          attr: 'Adult Female',
          itemid: 'EST-16'
        },
        {
          code: 'FL-DLH-02',
          name: 'Persian',
          unitcost: 12.0,
          status: 'P',
          listprice: 89.5,
          attr: 'Adult Male',
          itemid: 'EST-17'
        },
        {
          code: 'AV-CB-01',
          name: 'Amazon Parrot',
          unitcost: 92.0,
          status: 'P',
          listprice: 63.5,
          attr: 'Adult Male',
          itemid: 'EST-18'
        }
      ]
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
