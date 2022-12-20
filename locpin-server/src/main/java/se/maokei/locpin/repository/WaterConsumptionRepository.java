package se.maokei.locpin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import se.maokei.locpin.model.WaterConsumption;

import java.util.List;

public interface WaterConsumptionRepository extends JpaRepository<WaterConsumption, Integer> {

  @Query(value = "select * from waterconsumption"
      + " order by avgMonthlyKL desc"
      + " limit 10"
      , nativeQuery = true)
  List<WaterConsumption> findTopTenConsumers();
}

