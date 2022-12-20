package se.maokei.locpin.controller;

import org.springframework.web.bind.annotation.*;
import se.maokei.locpin.model.WaterConsumption;
import se.maokei.locpin.service.WaterConsumptionService;

import java.util.List;

@RestController
@RequestMapping("/waterconsumption")
public class WaterConsumptionController {
  public WaterConsumptionController(WaterConsumptionService waterConsumptionService) {
    this.waterConsumptionService = waterConsumptionService;
  }

  private final WaterConsumptionService waterConsumptionService;

  @GetMapping
  public List<WaterConsumption> findAll() {
    return waterConsumptionService.findAll();
  }

  @GetMapping(path = "/topten")
  public List<WaterConsumption> findTopTenConsumers() {
    return waterConsumptionService.findTopTenConsumers();
  }
}
