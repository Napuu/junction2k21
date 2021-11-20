import geopandas as gpd
import matplotlib.pyplot as plt
import contextily as ctx
import numpy as np
import pandas as pd

# read geodataframe from postgres
from sqlalchemy import create_engine
db_connection_url = "postgresql://avnadmin:a0gVJd26rXh0dZBW@pg-38139ff4-aalto-2b5f.aivencloud.com:20459/defaultdb?sslmode=require"
con = create_engine(db_connection_url)


from datetime import date, timedelta

def daterange(start_date, end_date):
    for n in range(int((end_date - start_date).days)):
        yield start_date + timedelta(n)

def write_date_to_geojson(date):
    sql_date = "SELECT kotipostinro, postinro, lkm FROM journeys where j_date = '" + date + "' order by lkm limit 1500"
    print(sql_date)
    # read postinumero + kotipostinro combo 
    df_date = pd.read_sql(sql_date, con)
    df_date["uniq"] = df_date["kotipostinro"] + df_date["postinro"]
    postinumero = df_date["uniq"]

    postinumero = ["'" + str(x) + "'" for x in postinumero]

    sql = "SELECT id, geom FROM route WHERE id in (" + ",".join(postinumero) + ")"
    print("querying routes next")
    df_temp = gpd.read_postgis(sql, con)
    #df_temp["geometry"] = df_temp["geom"]
    df_temp = df_temp.set_crs(4326)

    # df_temp = df_temp.drop(columns=["geom"])
    #return df_temp
    df_temp.to_file(date + ".geojson", driver="GeoJSON")

start_date = date(2019, 7, 1)
end_date = date(2020, 1, 1)
for single_date in daterange(start_date, end_date):
    date = str(single_date.strftime("%Y-%m-%d"))
    write_date_to_geojson(date)
