package se.maokei.locpin.service.impl;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.maokei.locpin.model.WaterConsumption;
import se.maokei.locpin.repository.WaterConsumptionRepository;
import se.maokei.locpin.service.WaterConsumptionService;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.List;

@Service
public class WaterConsumptionServiceImpl implements WaterConsumptionService {
  @Autowired
  private WaterConsumptionRepository waterConsumptionRepository;

  public List<WaterConsumption> findAll() {
    save_csv();
    return waterConsumptionRepository.findAll();
  }

  public List<WaterConsumption> findTopTenConsumers() {
    return waterConsumptionRepository.findTopTenConsumers();
  }

  public void save_csv() {

    // Read all the data from our table and store it in the response object
    List<WaterConsumption> res = waterConsumptionRepository.findAll();

    if (res.isEmpty()) {
      System.out.println("No Data");

      String[] HEADERS = {"Suburb", "AverageMonthlyKL", "Latitude", "Longitude"};
      String fileLocation = "C:\\Users\\Administrator\\Documents\\workspace-spring-tool-suite-4-4.11.1.RELEASE\\waterwatch\\src\\main\\resources\\waterwatch_data.csv";

      try {
        Reader in = new FileReader(fileLocation);
        Iterable<CSVRecord> records = CSVFormat.DEFAULT
            .withHeader(HEADERS)
            .withFirstRecordAsHeader()
            .parse(in);

        for (CSVRecord record : records) {
          String suburb = record.get("Suburb");
          String averageMonthlyKL = record.get("AverageMonthlyKL");
          String latitude = record.get("Latitude");
          String longitude = record.get("Longitude");

          // Convert to proper data types
          Integer avgMonthlyKL = Integer.valueOf(averageMonthlyKL);
          double dLatitude = Double.parseDouble(latitude);
          double dLongitude = Double.parseDouble(longitude);
          Point geom = new GeometryFactory().createPoint(new Coordinate(dLongitude, dLatitude));

          // Load data into our WaterConsumption Table
          WaterConsumption wc = new WaterConsumption();
          wc.setSuburb(suburb);
          wc.setAvgMonthlyKL(avgMonthlyKL);
          wc.setGeom(geom);
          waterConsumptionRepository.save(wc);
        }

      } catch (IOException e) {
        e.printStackTrace();
      }
    } else {
      System.out.println("Data Loaded");
    }
  }


}
