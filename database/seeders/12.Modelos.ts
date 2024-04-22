import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import TblModelos from "App/Infraestructura/Datos/Entidad/Modelos";

export default class extends BaseSeeder {
  public async run() {
    await TblModelos.createMany([
      {id:1,	nombre: '1990'},
{id:2,	nombre: '1991'},
{id:3,	nombre: '1992'},
{id:4,	nombre: '1993'},
{id:5,	nombre: '1994'},
{id:6,	nombre: '1995'},
{id:7,	nombre: '1996'},
{id:8,	nombre: '1997'},
{id:9,	nombre: '1998'},
{id:10,	nombre: '1999'},
{id:11,	nombre: '2000'},
{id:12,	nombre: '2001'},
{id:13,	nombre: '2002'},
{id:14,	nombre: '2003'},
{id:15,	nombre: '2004'},
{id:16,	nombre: '2005'},
{id:17,	nombre: '2006'},
{id:18,	nombre: '2007'},
{id:19,	nombre: '2008'},
{id:20,	nombre: '2009'},
{id:21,	nombre: '2010'},
{id:22,	nombre: '2011'},
{id:23,	nombre: '2012'},
{id:24,	nombre: '2013'},
{id:25,	nombre: '2014'},
{id:26,	nombre: '2015'},
{id:27,	nombre: '2016'},
{id:28,	nombre: '2017'},
{id:29,	nombre: '2018'},
{id:30,	nombre: '2019'},
{id:31,	nombre: '2020'},
{id:32,	nombre: '2021'},
{id:33,	nombre: '2022'},
{id:34,	nombre: '2023'},
{id:35,	nombre: '2024'}
    ]);
  }
}
